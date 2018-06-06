import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginPageComponent } from './login-page.component';
import { LoginFormComponent } from '../../component/login-form/login-form.component';
import { SharedModule } from '../../../shared/shared.module';
import { SharedMaterialModule } from '../../../shared-material/shared-material.module';
import { LoginRoutingModule } from '../../login-routing.module';
import { NgxsModule, Store } from '@ngxs/store';
import { AuthState } from '../../auth-state';
import { ApolloModule } from 'apollo-angular';
import { HttpLinkModule } from 'apollo-angular-link-http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { Login } from '../../auth-actions';

describe('LoginPageComponent', () => {
  let component: LoginPageComponent;
  let fixture: ComponentFixture<LoginPageComponent>;
  let store: Store;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports : [
        SharedModule,
        SharedMaterialModule,
        NgxsModule.forRoot([
          AuthState
        ]),
        ApolloModule,
        HttpLinkModule,
        BrowserAnimationsModule,
      ],
      declarations: [ LoginPageComponent, LoginFormComponent ]
    })
    .compileComponents();
    store = TestBed.get(Store);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch new login action', () => {
    spyOn(store, 'dispatch');
    component.onSubmit({username: 'test', password: 'testpassword'});
    expect(store.dispatch).toHaveBeenCalledWith(new Login('test', 'testpassword'));
  });
});
