import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private urlGetUser = 'User/GetUser';
  private urlUser = 'User';

  constructor(private http: HttpClient) { }

  public getUser(): Observable<User> { 
    return this.http.get<User>(`${environment.apiUrl}/${this.urlGetUser}`).pipe(
      map((user: User) => user || [])
    );
  }

  public updateUser(user: User): Observable<User> {
    const url = `${environment.apiUrl}/${this.urlUser}?userId=${user.userId}`;
    return this.http.put<User>(url, user).pipe(
      map((updatedUser: User) => updatedUser)
    );
  }
}
