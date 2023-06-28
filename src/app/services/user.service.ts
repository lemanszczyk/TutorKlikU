import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserPassword } from '../models/userPassword';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private urlGetUser = 'User/GetUser';
  private urlUser = 'User';
  private urlUpdatePassword = 'User/UpdatePassword'

  constructor(private http: HttpClient) { }

  public getUser(id: number): Observable<User> { 
    const url = `${this.urlGetUser}?id=${id}`;
    return this.http.get<User>(`${environment.apiUrl}/${url}`).pipe(
      map((user: User) => user || [])
    );
  }

  public updateUser(user: User): Observable<User> {
    const url = `${environment.apiUrl}/${this.urlUser}`;
    return this.http.put<User>(url, user).pipe(
      map((updatedUser: User) => updatedUser)
    );
  }

  public updatePassword(user: UserPassword): Observable<UserPassword> {
    const url = `${environment.apiUrl}/${this.urlUpdatePassword}`;
    return this.http.put<UserPassword>(url, user);
  }
}
