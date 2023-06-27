import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Announcement } from '../models/announcement';
import { map } from 'rxjs/operators';
import { Comment as AppComment } from '../models/comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) { }

  private urlGetAnnouncement = 'Announcement/GetAnnouncement';
  private urlAddComment = 'Comment/AddComment';
  
  public getCommentsForAnnouncement(id: number): Observable<AppComment[]> { 
    const url = `${this.urlGetAnnouncement}/?id=${id}`;
    return this.http.get<Announcement>(`${environment.apiUrl}/${url}`).pipe(
      map((announcement: Announcement) => announcement.comments || [])
    );
  }

  public addComment(comment: AppComment): Observable<AppComment> {
    return this.http.post<AppComment>(`${environment.apiUrl}/${this.urlAddComment}`, comment);
  }
}