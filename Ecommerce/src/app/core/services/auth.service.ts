import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private http = inject(HttpClient);

  private baseUrl = "http://localhost:8000";

  private token : string | null = null;

  setToken(token:string){
    this.token = token;
  }

  getToken(){
    return this.token;
  }

  healthCheck():Observable<any>{
    return this.http.get(`${this.baseUrl}/health`);
  }

  me():Observable<any>{
    return this.http.get(`${this.baseUrl}/api/auth/me`);
  }

  logout():Observable<any>{
    return this.http.post(`${this.baseUrl}/api/auth/logout`,{});
  }

  refreshToken():Observable<any>{
    return this.http.post(`${this.baseUrl}/api/auth/refresh-token`,{});
  }

  login(data:any):Observable<any>{
    return this.http.post(`${this.baseUrl}/api/auth/login`,data);
  }

  register(data:any):Observable<any>{
    return this.http.post(`${this.baseUrl}/api/auth/register`,data);
  }
  
}
