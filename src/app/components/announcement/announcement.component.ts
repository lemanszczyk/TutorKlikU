import { Component, Input } from '@angular/core';
import { Announcement } from 'src/app/models/announcement';
import { AnnouncementService } from 'src/app/services/announcement.service';

@Component({
  selector: 'app-announcement',
  templateUrl: './announcement.component.html',
  styleUrls: ['./announcement.component.css']
})
export class AnnouncementComponent {
  @Input() announcement!: Announcement;
  announcements: Announcement[] = [];

  constructor(private announcementService: AnnouncementService) {}

  ngOnInit() {
    this.getAnnoucments();
 }
 
 getAnnoucments() {
  this.announcementService.getAnnoucements().subscribe(
    (announcements: Announcement[]) => {
      this.announcements = announcements;
    },
    (error) => {
      console.log(error);
    }
  );
 }
}
