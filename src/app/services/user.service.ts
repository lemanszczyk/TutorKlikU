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
  constructor(private http: HttpClient) { }


  public getUser(id: number): Observable<User> { 
    const url = `${this.urlGetUser}/?id=${id}`;
    return this.http.get<User>(`${environment.apiUrl}/${url}`).pipe(
      map((user: User) => user || [])
    );
  }
}
