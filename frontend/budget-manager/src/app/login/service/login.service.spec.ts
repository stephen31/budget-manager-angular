import { TestBed, inject, fakeAsync } from '@angular/core/testing';

import { LoginService } from './login.service';
import { ApolloModule, Apollo } from 'apollo-angular';

describe('AuthService', () => {
  let apollo;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ApolloModule
      ],
      providers: [LoginService]
    });
    apollo = TestBed.get(Apollo);
  });

  it('should be created', inject([LoginService], (service: LoginService) => {
    expect(service).toBeTruthy();
  }));

  // describe('login', () => {
  //   it('should send the correct query', fakeAsync(() => {
  //     const service = TestBed.get(LoginService);
  //     spyOn(apollo, 'watchQuery');
  //     service.login({username: 'toto', password: 'passwordToto'});

  //     expect(apollo.watchQuery).toHaveBeenCalledWith({});
  //   }));
  // });
});
