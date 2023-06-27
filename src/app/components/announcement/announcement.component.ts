import { Component, Input } from '@angular/core';
import { Announcement } from 'src/app/models/announcement';
import { AnnouncementService } from 'src/app/services/announcement.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Comment } from 'src/app/models/comment';
import { CommentService } from 'src/app/services/comment.service';

@Component({
  selector: 'app-announcement',
  templateUrl: './announcement.component.html',
  styleUrls: ['./announcement.component.css']
})
export class AnnouncementComponent {
  @Input() announcement!: Announcement;
  announcements: Announcement[] = [];
  imgUrl: SafeUrl | undefined;

  constructor(private announcementService: AnnouncementService, private commentService: CommentService, private domSanitizer: DomSanitizer) {}

  ngOnInit() {
    this.getAnnoucments();
 }
 
 getAnnoucments() {
  this.announcementService.getAnnoucements().subscribe(
    (announcements: Announcement[]) => {
      this.announcements = announcements;

      if (this.announcement.author && this.announcement.author.profileImage) {
        this.imgUrl = this.domSanitizer.bypassSecurityTrustUrl(this.announcement.author.profileImage) as SafeUrl;
      }
    },
    (error) => {
      console.log(error);
    }
  );
 }

 calculateAverageRating(comments: Comment[]): number {
  let sum = 0;
  let count = 0;
  
  for (const comment of comments) {
    const rate = Number(comment.rate);
    if (!isNaN(rate)) {
      sum += rate;
      count++;
    }
  }
  
  if (count > 0) {
    return sum / count;
  }
  
  return 0; // Domyślna wartość, gdy brak ocen
  }
}
