import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Announcement } from 'src/app/models/announcement';
import { AnnouncementService } from 'src/app/services/announcement.service';

@Component({
  selector: 'app-edit-announcement-dialog',
  templateUrl: './edit-announcement-dialog.component.html',
  styleUrls: ['./edit-announcement-dialog.component.css']
})
export class EditAnnouncementDialogComponent {
  announcement = new Announcement();
  emptyFieldError: string = '';
  tags: string | undefined;

  constructor(private announcementService: AnnouncementService, public dialogRef: MatDialogRef<EditAnnouncementDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit() {
    console.log(this.data);
    this.announcement = this.data.announcement
    this.tags = this.announcement.tags?.join(',');
    console.log(this.announcement);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  EditAnnoucement(): void {
    if (this.announcement.annoucementDescription == '' || this.announcement.annoucementName == '') {
      this.emptyFieldError = '*There are empty fields';
    }
    else {
      this.emptyFieldError = '';
      // this.announcement.author = this.data;
      console.log(this.announcement.annoucementName + ": " + this.announcement.annoucementDescription);
      this.announcement.tags = this.tags!.split(',')
      this.announcementService.editAnnoucement(this.announcement).subscribe( x => {
        if( x !== null){
          this.dialogRef.close();
          window.location.reload();
        }
      });
    }
  }
}
