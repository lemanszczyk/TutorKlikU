import { Component, Sanitizer } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Announcement } from 'src/app/models/announcement';
import { AnnouncementService } from 'src/app/services/announcement.service';

@Component({
  selector: 'app-one-announcement',
  templateUrl: './one-announcement.component.html',
  styleUrls: ['./one-announcement.component.css']
})
export class OneAnnouncementComponent {
  id: number = 0;
  announcement!: Announcement;
  imgUrl: SafeUrl | undefined;

  constructor(private route: ActivatedRoute, private announcementService: AnnouncementService, private domSanitizer: DomSanitizer) {}
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
      } 
    }
    )}
}
