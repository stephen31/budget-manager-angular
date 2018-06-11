import { TestBed, inject, fakeAsync, async } from '@angular/core/testing';
import gql from 'graphql-tag';
import { LoginService } from './login.service';
import { ApolloModule, Apollo } from 'apollo-angular';
import { HttpClientModule } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HttpLink } from 'apollo-angular-link-http';
import {execute} from 'apollo-link';

const mockApolloService = {
  watchQuery : () => {}
};

describe('AuthService', () => {
  // let apollo;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ApolloModule, HttpClientModule, HttpClientTestingModule],
      providers: [HttpLink, LoginService, {provide: Apollo, useValue: mockApolloService}]
    });
  });

  afterEach(
    inject([HttpTestingController], (backend: HttpTestingController) => {
      backend.verify();
    }),
  );

  it('should be created', inject([LoginService], (service: LoginService) => {
    expect(service).toBeTruthy();
  }));

  it('should use HttpClient',
    fakeAsync(
      inject(
        [HttpLink, HttpTestingController],
        (httpLink: HttpLink, httpBackend: HttpTestingController) => {
          const link = httpLink.create({uri: 'graphql'});
          const op = {
            query: gql`
              query heroes {
                heroes {
                  name
                }
              }
            `,
            operationName: 'heroes',
            variables: {},
          };
          const data = {
            heroes: [{name: 'Superman'}],
          };

          execute(link, op).subscribe({
            next: (result: any) => expect(result).toEqual({data}),
            error: () => {
              throw new Error('Should not be here');
            },
          });

          httpBackend.expectOne('graphql').flush({data});
        },
      ),
    ),
  );

  // describe('login', () => {
  //   it('should send the correct query', fakeAsync(() => {
  //     const service = TestBed.get(LoginService);
  //     apollo = TestBed.get(Apollo);

  //     spyOn(apollo, 'watchQuery').and.returnValue({valueChanges: jasmine.createSpy});
  //     service.login({username: 'toto', password: 'passwordToto'});

  //     expect(apollo.watchQuery).toHaveBeenCalledWith({});
  //   }));
  // });
});
