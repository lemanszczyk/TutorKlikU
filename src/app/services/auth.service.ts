import { Injectable } from '@angular/core';
import { User } from '../models/userLogin';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private urlregister = "Auth/register";
  private urllogin = "Auth/login";

  constructor(private http: HttpClient) { }
  public register(user: User): Observable<any>{
    return this.http.post<any>(`${environment.apiUrl}/${this.urlregister}`, user);
  }

  public login(user: User): Observable<string> {
    return this.http.post(`${environment.apiUrl}/${this.urllogin}`, user, {
      responseType: 'text',
    });
  }
}
