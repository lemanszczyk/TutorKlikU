import { Component } from '@angular/core';
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

  constructor(private route: ActivatedRoute, private announcementService: AnnouncementService) {}
  ngOnInit() {
    this.route.params.subscribe(params => {
      console.log(params);
      this.id = +params['id'];
    });
    this.getAnnouncement();
    console.log(this.announcement);
  }
  getAnnouncement() {
    this.announcementService.getAnnoucement(this.id)
    .subscribe((result: Announcement) => (this.announcement = result));
    console.log(this.announcement);
  }
}
