import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { UserRegisterResponseInterface, UserResponseInterface, UserStateResponseInterface, UserVerifyResponseInterface, UserLoginResponseInterface, UserTokenResponseInterface } from '../interfaces/user.response.interface';


@Injectable({
  providedIn: 'root'
})
export class UserProvider {
  apiUrl = 'https://auth.ponddy.com';

  constructor(
              private readonly httpClient: HttpClient) {
  }


  public userState(email: any): Observable<UserStateResponseInterface> {
    let body = { email: email };

    return this.httpClient.post<UserStateResponseInterface>(`${this.apiUrl}/api/auth/auth/exists`, body);
  }

  public userRegister(email: any, password: any): Observable<UserRegisterResponseInterface> {
    let body = {
      email: email,
      password: password,
      client_id: '215e3662-7d1a-4bc6-b151-971441e92638',
      redirect_uri: "https://kids.ponddy.com/",
      next: "/",
      template: "WITH-CODE"
    };

    return this.httpClient.post<UserRegisterResponseInterface>(`${this.apiUrl}/api/auth/auth/register`, body);
  }

  public userVerify(email: any, textVerify: any): Observable<UserVerifyResponseInterface> {
    let code = textVerify[0] + textVerify[1] + textVerify[2] + textVerify[3];
    let body = {
      email: email,
      code: code
    };

    return this.httpClient.post<UserVerifyResponseInterface>(`${this.apiUrl}/api/auth/auth/verify`, body);
  }

  public userResend(email: any): Observable<UserVerifyResponseInterface> {
    let body = {
      email: email,
      template: "WITH-CODE",
      client_id: '215e3662-7d1a-4bc6-b151-971441e92638',
      redirect_uri: "https://kids.ponddy.com/",
      next: "/",
    };

    return this.httpClient.post<UserVerifyResponseInterface>(`${this.apiUrl}/api/auth/auth/resend`, body);
  }

  public userLogin(email: any, password: any, app: any): Observable<UserLoginResponseInterface> {
    let body = {
      email: email,
      password: password,
      app: app,
      g_recaptcha_response: ''
    };

    return this.httpClient.post<UserLoginResponseInterface>(`${this.apiUrl}/api/auth/auth`, body);
  }

  public userToken(token: any): Observable<UserTokenResponseInterface> {
    let options = new Object();
    let headers = new HttpHeaders().set("Authorization", `SSO ${token}`);

    return this.httpClient.get<UserTokenResponseInterface>(`https://auth.ponddy.com/api/auth/gen/auth`,{headers: headers})
  }

  public userSelf(token: any): Observable<UserResponseInterface> {
    let options = new Object();
    let headers = new HttpHeaders().set("Authorization", `SSO ${token}`);

    return this.httpClient.get<UserResponseInterface>(`https://auth.ponddy.com/api/auth/users/info`,{headers: headers})
  }
}
