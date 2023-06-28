import { Component } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { UserPassword } from 'src/app/models/userPassword';
import { AddAnnouncementDialogComponent } from 'src/app/components/add-announcement-dialog/add-announcement-dialog.component';
import { MatDialog } from '@angular/material/dialog';

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
  
  constructor(private route: ActivatedRoute, private domSanitizer: DomSanitizer, private userService: UserService, public dialog: MatDialog) {}
  
  ngOnInit() {
    this.getUserData();
    const a = 1;
    this.getUserPassword(a);
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

  getUserPassword(id: number) {
    this.userService.getUser(id).subscribe({
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
        } else {
          this.nameError = '*Nazwa użytkownika to imię i nazwisko, np. Jan Kowalski'
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
          this.mailError = "*Błędny format e-maila! Poprawny przykładowy adres: e-mail@poczta-polska.ru";
        }
        console.log('Wprowadzony mail:', this.user.email);
        break;

      // Typ musi być wybrany
      case 'typ':
        if (temp != '') {
          this.user.userType = temp;
          this.typeError = '';
          console.log('Wprowadzony typ:', this.user.userType);
        } else {
          this.typeError = "*Musisz wybrać wartość!";
        }
        break;

      // Obraz o rozmiarze maksymalnie ~1 MB
      case 'obraz':
        if (temp != 'Błąd' && temp != '') {
          this.user.profileImage = temp;
          this.imageError = '';
          console.log("Obraz wprowadzony");
        } else if (temp == '') {
          this.imageError = "*Musisz wybrać obraz";
        } else {
          this.imageError = "*Obraz może mieć rozmiar maksymalnie 1 MB";
        }
        break;

      default:
        console.log('Co tu sie dzieje?');
        break;
    }

    // Update usera z nową wartością
    this.userService.updateUser(this.user).subscribe(
      updatedUser => {
        console.log('UDAŁO SIĘ ZAKTUALIZOWAĆ?');
      },
      error => {
        console.error('NIE UDAŁO SIĘ ZAKTUALIZOWAĆ :(');
      }
    );

    // Przeładowanie obrazka dla profilowego
    if (choice == 'obraz' && temp != '' && temp != 'Błąd') {
      window.location.reload();
    }
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