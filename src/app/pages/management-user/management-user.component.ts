import { Component } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-management-user',
  templateUrl: './management-user.component.html',
  styleUrls: ['./management-user.component.css']
})
export class ManagementUserComponent {
  user!: User;
  imgUrl: SafeUrl | undefined;
  
  constructor(private route: ActivatedRoute, private domSanitizer: DomSanitizer, private userService: UserService) {}
  
  ngOnInit() {
    const a = 1;
    this.getAnnouncement(a);
  }
  getAnnouncement(id: number) {
    this.userService.getUser(id).subscribe({
      next: (result: User) => {
        this.user = result;
        this.imgUrl = this.domSanitizer.bypassSecurityTrustUrl(this.user.profileImage!);
      }
  })
}
}
