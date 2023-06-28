import { Component } from '@angular/core';
import { AnnouncementService } from 'src/app/services/announcement.service';
import { Announcement } from '../../models/announcement'

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  constructor(private announcementService: AnnouncementService) {}
  announcements!: Announcement[];

  ngOnInit() {
    this.getAnnouncement();
 }

 getAnnouncement() {
  this.announcementService.getAnnoucements()
  .subscribe((result: Announcement[]) => (this.announcements = result));
}
}
