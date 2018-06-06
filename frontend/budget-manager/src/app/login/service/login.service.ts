import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Authenticate, Signon } from '../auth-model';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private apollo: Apollo) {
  }

  login(credentials: Authenticate): Observable<any> {
    return this.apollo.watchQuery<any>({
      query: LoginQuery, variables: {
        username: credentials.username,
        password: credentials.password
      }
    }).valueChanges;
  }

  register(payload: Signon): Observable<any> {
    return this.apollo.mutate({
      mutation: RegisterMutation,
      variables: {
        username: payload.username,
        email: payload.email,
        password: payload.password
      }
    });
  }
}


const LoginQuery = gql`
query Login($username: String!, $password:String!) {
    login(username: $username, password: $password) {
      username
      email
      createdAt
      jwt
    }
}`;

const RegisterMutation = gql`
mutation Register($username: String!, $email: String!, $password:String!) {
  addUser(username: $username, email: $email, password: $password) {
      username
      email
      createdAt
      jwt
    }
}`;
