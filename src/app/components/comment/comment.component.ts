import { Component, Input } from '@angular/core';
import  {Comment} from '../../models/comment';
import { User } from 'src/app/models/user';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent {
  @Input() comment!: Comment;
  imgUrl: SafeUrl | undefined;

  constructor(private domSanitizer: DomSanitizer) {}

  ngOnInit() {
    this.imgUrl = this.domSanitizer.bypassSecurityTrustUrl(this.comment.author.profileImage!);
    if (this.comment.author.profileImage == null){
      this.imgUrl = '../../../assets/default-user-image.png';
    }
 }
}
