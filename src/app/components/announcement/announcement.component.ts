import { Component, Input } from '@angular/core';
import { Announcement } from 'src/app/models/announcement';

@Component({
  selector: 'app-announcement',
  templateUrl: './announcement.component.html',
  styleUrls: ['./announcement.component.css']
})
export class AnnouncementComponent {
  @Input() announcement!: Announcement;

  ngOnInit() {
    console.log('aala1');
    console.log(this.announcement);  
 }
}
