import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Announcement } from 'src/app/models/announcement';
import { AnnouncementService } from 'src/app/services/announcement.service';

@Component({
  selector: 'app-add-announcement-dialog',
  templateUrl: './add-announcement-dialog.component.html',
  styleUrls: ['./add-announcement-dialog.component.css']
})
export class AddAnnouncementDialogComponent {
  announcement = new Announcement();
  emptyFieldError: string = '';
  tags: string = '';

  constructor(private announcementService: AnnouncementService, public dialogRef: MatDialogRef<AddAnnouncementDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  AddAnnoucement(): void {
    if (this.announcement.annoucementDescription == '' || this.announcement.annoucementName == '') {
      this.emptyFieldError = '*There are empty fields';
    }
    else {
      this.emptyFieldError = '';
      // this.announcement.author = this.data;
      console.log(this.announcement.annoucementName + ": " + this.announcement.annoucementDescription);
      this.announcement.tags = this.tags.split(',')
      this.announcementService.addAnnoucement(this.announcement).subscribe( x => {
        if( x !== null){
          this.dialogRef.close();
          window.location.reload();
        }
      });
    }
  }
}
