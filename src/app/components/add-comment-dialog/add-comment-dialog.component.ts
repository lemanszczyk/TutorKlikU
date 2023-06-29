import { Component,  Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Comment } from 'src/app/models/comment';
import { DialogData } from 'src/app/models/dialogAddComment';
import { CommentService } from 'src/app/services/comment.service';

@Component({
  selector: 'app-add-comment-dialog',
  templateUrl: './add-comment-dialog.component.html',
  styleUrls: ['./add-comment-dialog.component.css']
})
export class AddCommentDialogComponent {
  
  comment = new Comment();
  public stars: boolean[] = Array(5).fill(false);
  rating: number = 1;
  error: string = '';

  constructor(private commentService: CommentService, public dialogRef: MatDialogRef<AddCommentDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) {}
  
  ngOnInit() {
    this.stars[0] = true;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  AddComment(): void {
    console.log(this.comment.description);
    this.validate();
    this.comment.rate = this.rating;
    this.comment.announcementId = this.data.announcementId;
    this.commentService.addComment(this.comment).subscribe( x => {
      if( x !== null && this.error == '') {
        this.dialogRef.close();
        window.location.reload();
      }
    });

  }

  validate(): void {
    if (this.comment.description == '') {
      this.error = "*Empty comment";
    }
  }

  public rate(rating: number) {
    console.log('rating', rating);
    this.stars = this.stars.map((_, i) => rating > i);
    this.rating = rating;
  }

}
