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
  name: string = '';
  mail: string = '';
  type: string = '';
  image: string = '';
  
  constructor(private route: ActivatedRoute, private domSanitizer: DomSanitizer, private userService: UserService) {}
  
  ngOnInit() {
    this.getUserData();
  }

  getUserData() {
    this.userService.getUser().subscribe({
      next: (result: User) => {
        this.user = result;
        if (this.user.profileImage) {
          this.imgUrl = this.domSanitizer.bypassSecurityTrustUrl(this.user.profileImage) as SafeUrl;
        }
      }
    })
  }

  updateUser(temp: string, choice: string) {
    switch (choice) {
      case 'nazwa':
        this.user.userName = temp;
        console.log('Wprowadzona nazwa:', this.user.userName);
        break;
      case 'mail':
        // Regex dla e-maila
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (emailRegex.test(temp)) {
          this.user.email = temp;
          this.mail = '';
        } else {
          this.mail = "Błedny e-mail!";
        }
        console.log('Wprowadzony mail:', this.user.email);
        break;
      case 'typ':
        this.user.userType = temp;
        console.log('Wprowadzony typ:', this.user.userType);
        break;
      case 'obraz':
        this.user.profileImage = temp;
        console.log("Wprowadzony OBRAZ:", this.user.profileImage);
        break;
      default:
        console.log('Co tu sie dzieje?');
        break;
    }

    //Update usera z nową wartością
    this.userService.updateUser(this.user).subscribe(
      updatedUser => {
        console.log('UDAŁO SIĘ ZAKTUALIZOWAĆ?');
      },
      error => {
        console.error('NIE UDAŁO SIĘ ZAKTUALIZOWAĆ :(');
      }
    );
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
  
    const reader = new FileReader();
    reader.onload = () => {
      const base64Image: string = reader.result as string;
      this.image = base64Image;
    };
    reader.readAsDataURL(file);
  }
}