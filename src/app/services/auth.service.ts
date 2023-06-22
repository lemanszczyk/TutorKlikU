import { Injectable } from '@angular/core';
import { User } from '../models/userLogin';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Announcement } from '../models/announcement';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private urlRegister = "Auth/register";
  private urlLogin = "Auth/login";

  constructor(private http: HttpClient) { }
  public register(user: User): Observable<string>{
    return this.http.post(`${environment.apiUrl}/${this.urlRegister}`, user, {
      responseType: 'text'
    });
  }

  public login(user: User): Observable<string> {
    return this.http.post(`${environment.apiUrl}/${this.urlLogin}`, user, {
      responseType: 'text',
    });
  }
}
