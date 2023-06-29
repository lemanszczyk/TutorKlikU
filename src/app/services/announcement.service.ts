import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Announcement } from '../models/announcement';

@Injectable({
  providedIn: 'root'
})
export class AnnouncementService {

  private urlGetAnnouncements = 'Announcement/GetAnnouncements';
  private urlGetAnnouncement = 'Announcement/GetAnnouncement';
  private urlAddAnnouncement = 'Announcement/AddAnnouncement';
  private urlGetUserAnnouncement = 'Announcement/GetUserAnnouncements';
  private urlEditAnnouncement = 'Announcement/EditAnnouncement';
  private urlDeleteAnnouncement = 'Announcement/DeleteAnnouncement';
  
  constructor(private http: HttpClient) { }
  
  public getAnnoucements(): Observable<Announcement[]> {
    return this.http.get<Announcement[]>(`${environment.apiUrl}/${this.urlGetAnnouncements}`)
  }
  
  public getAnnoucement(id: number): Observable<Announcement> {
    const url = `${this.urlGetAnnouncement}/?id=${id}`;
    return this.http.get<Announcement>(`${environment.apiUrl}/${url}`)
  }

  public countAverageRating(ann: Announcement): number {
    let sum: number = 0;
    let count: number = 0;
    ann.comments?.forEach( x => {
      sum += x.rate!;
      count++;
    })
    if(count == 0){
      return 0;
    }
    return sum/count;
  }

  public addAnnoucement(announcement: Announcement): Observable<Announcement> {
    return this.http.post<Announcement>(`${environment.apiUrl}/${this.urlAddAnnouncement}`, announcement);
  }

  public getUserAnnouncements(): Observable<Announcement[]> {
    return this.http.get<Announcement[]>(`${environment.apiUrl}/${this.urlGetUserAnnouncement}`);
  }

  public editAnnoucement(announcement: Announcement): Observable<Announcement> {
    return this.http.post<Announcement>(`${environment.apiUrl}/${this.urlEditAnnouncement}`, announcement);
  }

  public deleteAnnoucement(id: number): Observable<string> {
    const url = `${this.urlDeleteAnnouncement}/?id=${id}`;
    return this.http.delete<string>(`${environment.apiUrl}/${url}`);
  }
}
