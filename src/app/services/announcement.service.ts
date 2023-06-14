import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Announcement } from '../models/announcement';

@Injectable({
  providedIn: 'root'
})
export class AnnouncementService {

  private urlGetAnnouncement = 'Announcement/GetAnnouncement';
  
  constructor(private http: HttpClient) { }
  
  public getAnnoucements(): Observable<Announcement[]> {
    return this.http.get<Announcement[]>(`${environment.apiUrl}/${this.urlGetAnnouncement}`)
  }
}
