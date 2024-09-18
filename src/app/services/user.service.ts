import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { BaseURL } from '../services/constant-url.service';

const BASE_URL = BaseURL;

@Injectable()
export class UserService {
  constructor(private http: HttpClient) {}
  //====================Create User========================
  // addDenial(EMAIL: any, PASSWORD: any) {
  //   const UserAddData = { EMAIL, PASSWORD };
  //   return this.http.post(`${BASE_URL}insert`, UserAddData);
  // }

  getOtp(data:any):Observable<any>{
    const url = `${BASE_URL}changepassword/forpassword`;
    console.log(data,"dataonpayload")
    return this.http.post(url, data)
  }
  
}
