import { Component, Sanitizer } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { AddCommentDialogComponent } from 'src/app/components/add-comment-dialog/add-comment-dialog.component';
import { Announcement } from 'src/app/models/announcement';
import { AnnouncementService } from 'src/app/services/announcement.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-one-announcement',
  templateUrl: './one-announcement.component.html',
  styleUrls: ['./one-announcement.component.css']
})
export class OneAnnouncementComponent {
  id: number = 0;
  announcement!: Announcement;
  imgUrl: SafeUrl | undefined;
  averageRating: number = 0;
  email: string = '';
  ifUser = !(localStorage.length === 0);
  ifTags: boolean = false;
  ifComments: boolean = false;

  constructor(private route: ActivatedRoute, private announcementService: AnnouncementService, private domSanitizer: DomSanitizer, public dialog: MatDialog) {}
  ngOnInit() {
    this.route.params.subscribe(params => {
      console.log(params);
      this.id = +params['id'];
    });
    this.getAnnouncement();
  }
  getAnnouncement() {
    this.announcementService.getAnnoucement(this.id)
    .subscribe({
      next: (result: Announcement) => {
        this.announcement = result;
        this.imgUrl = this.domSanitizer.bypassSecurityTrustUrl(this.announcement.author!.profileImage!);
        this.averageRating = this.announcementService.countAverageRating(this.announcement);
        this.email = 'mailto:' + this.announcement.author!.email;
        this.ifTags = !(this.announcement.tags?.length === 0);
        this.ifComments = !(this.announcement.comments?.length === 0);
        } 
      }
    )}

    openDialog() {
      let dialogRef = this.dialog.open(AddCommentDialogComponent, {
        height: '450px',
        width: '600px',
        data:  {announcementId: this.announcement.annoucementId}
      });
    }
}
