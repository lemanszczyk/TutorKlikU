import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogData } from 'src/app/models/dialogAddComment';

@Component({
  selector: 'app-alert-dialog',
  templateUrl: './alert-dialog.component.html',
  styleUrls: ['./alert-dialog.component.css']
})
export class AlertDialogComponent {
  alert: string = '';


  constructor( public dialogRef: MatDialogRef<AlertDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: string) {}
  
  ngOnInit() {
    console.log(this.data);
    this.alert = this.data;
  }

  onNoClick(): void {
    this.dialogRef.close({event:'Cancel'});
  }

  submit(): void {
    this.dialogRef.close({data:'ok'});
  }

}
