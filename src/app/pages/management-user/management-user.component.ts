import { Component } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { UserPassword } from 'src/app/models/userPassword';
import { AddAnnouncementDialogComponent } from 'src/app/components/add-announcement-dialog/add-announcement-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { AnnouncementService } from 'src/app/services/announcement.service';
import { Announcement } from 'src/app/models/announcement';
import { EditAnnouncementDialogComponent } from 'src/app/components/edit-announcement-dialog/edit-announcement-dialog.component';
import { AlertDialogComponent } from 'src/app/components/alert-dialog/alert-dialog.component';

@Component({
  selector: 'app-management-user',
  templateUrl: './management-user.component.html',
  styleUrls: ['./management-user.component.css']
})
export class ManagementUserComponent {
  user!: User;
  userPassword!: UserPassword;
  imgUrl: SafeUrl | undefined;
  name: string = ''; nameError: string = '';
  mail: string = ''; mailError: string = '';
  type: string = ''; typeError: string = '';
  image: string = ''; imageError: string = '';
  password: string = ''; password2: string = ''; passwordError: string = '';
  announcements: Announcement[] | undefined;
  
  
  constructor(private router: Router, private route: ActivatedRoute, private announcementService: AnnouncementService, private domSanitizer: DomSanitizer, private userService: UserService, public dialog: MatDialog) {}
  
  ngOnInit() {
    this.getUserData();
    // this.getUserPassword();
  }

  getUserAnnouncement() {
    this.announcementService.getUserAnnouncements()
    .subscribe((result: Announcement[]) => (this.announcements = result));
  }

  getUserData() {
    this.userService.getUser().subscribe({
      next: (result: User) => {
        this.user = result;
        if(this.user.userType == 'Tutor') {
          this.getUserAnnouncement();
        }

        if (this.user.profileImage) {
          this.imgUrl = this.domSanitizer.bypassSecurityTrustUrl(this.user.profileImage) as SafeUrl;
        }
      }
    })
  }

  editAnnouncement(id: number) {
    let dialogRef = this.dialog.open(EditAnnouncementDialogComponent, {
      height: '550px',
      width: '600px',
      data:  {announcement: this.announcements?.find(x => x.annoucementId == id)}
    });
  }

  deleteAnnouncement(id: number) {
    this.announcementService.deleteAnnoucement(id).subscribe( x => {
      if( x !== null){
        window.location.reload();
      }
    })
  }

  getUserPassword() {
    this.userService.getUser().subscribe({
      next: (result: UserPassword) => {
        this.userPassword = result;
      }
    });
  }

  updateUser(temp: string, choice: string) {
    switch (choice) {
      case 'nazwa':
        // Regex dla nazwy w formacie - Imię Nazwisko
        const nazwaRegex = /^[A-ZĄĆĘŁŃÓŚŹŻ][a-ząćęłńóśźż]+\s+[A-ZĄĆĘŁŃÓŚŹŻ][a-ząćęłńóśźż]+$/;
        if (nazwaRegex.test(temp)) {
          this.user.userName = temp;
          this.name = '';
          this.nameError = '';
          console.log('Wprowadzona nazwa:', this.user.userName);
          this.confirm();
        } else {
          this.nameError = '*Correct name is in example Jan Kowalski'
        }
        
        break;

      case 'mail':
        // Regex dla e-maila
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (emailRegex.test(temp)) {
          this.user.email = temp;
          this.mail = '';
          this.mailError = '';
          console.log('Wprowadzony e-mail:', this.user.email);
        } else {
          this.mailError = "*Wrong e-mail format! Example of correct address: e-mail@poczta-polska.ru";
        }
        console.log('Wprowadzony mail:', this.user.email);
        break;

      // Typ musi być wybrany
      // case 'typ':
      //   if (temp != '') {
      //     this.user.userType = temp;
      //     this.typeError = '';
      //     console.log('Wprowadzony typ:', this.user.userType);
      //     this.confirm();
      //   } else {
      //     this.typeError = "*You have to choose one!";
      //   }
      //   break;

      // Obraz o rozmiarze maksymalnie ~1 MB
      case 'obraz':
        if (temp != 'Błąd' && temp != '') {
          this.user.profileImage = temp;
          this.imageError = '';
          console.log("Obraz wprowadzony");
        } else if (temp == '') {
          this.imageError = "*You need to choose image";
        } else {
          this.imageError = "*Max size of 1MB";
        }
        break;

      default:
        console.log('Co tu sie dzieje?');
        break;
    }

    // Update usera z nową wartością
    if ( choice != ('typ' || 'nazwa')){
      this.userUpdate()
    }
  }

  userUpdate() {
    this.userService.updateUser(this.user).subscribe(
      updatedUser => {
        console.log('UDAŁO SIĘ ZAKTUALIZOWAĆ?');
        window.location.reload();
      },
      error => {
        console.error('NIE UDAŁO SIĘ ZAKTUALIZOWAĆ :(');
      }
    );
  }

  confirm() {
    let dialogRef = this.dialog.open(AlertDialogComponent, {
      height: '200px',
      width: '400px',
      data: {message: 'Po wybraniu tej akcji zostaniesz wylogowany, czy jesteś pewny?'} 
    });
    dialogRef.afterClosed().subscribe(x =>{
      if (x.event == 'Cancel'){
        return;
      }
      else { 
        this.userUpdate();
        localStorage.clear();
        this.router.navigate(['/main']).then(() => window.location.reload());
      }

    })
  }

  updatePassword() {
    if (this.password == this.password2 && this.password != '') {
      this.userPassword.password = this.password;
      this.passwordError = '';
      console.log("Wprowadzone hasło:", this.userPassword.password);
      this.userService.updatePassword(this.userPassword).subscribe(
        updatedUser => {
          console.log("gitara");
        },
        error => {
          console.log("dzban");
        }
      );
    } else if (this.password == '') {
      this.passwordError = "*Musisz wprowadzić hasło";
    } else {
      this.passwordError = "*Błąd! Hasła się nie zgadzają!";
    }
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
  
    const reader = new FileReader();
    reader.onload = () => {
      const base64Image: string = reader.result as string;

      const fileSizeInBytes = base64Image.length * 0.75; // Przybliżony rozmiar w bajtach
      const fileSinzeInKB = fileSizeInBytes / 1024; // Konwersja na kilobajty

      if (fileSinzeInKB > 1024) {
        this.image = 'Błąd';
      } else {
        this.image = base64Image;
      }
    };
    reader.readAsDataURL(file);
  }

  openDialog() {
    let dialogRef = this.dialog.open(AddAnnouncementDialogComponent, {
      height: '550px',
      width: '600px',
      data:  {user: this.user}
    });
  }
}