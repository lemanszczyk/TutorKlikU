import { Component } from '@angular/core';
import { userRegister } from 'src/app/models/userRegister';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { AlertDialogComponent } from 'src/app/components/alert-dialog/alert-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user = new userRegister();
  error: string[] = ['', '', '', '', ''];
  constructor(private authService: AuthService, private router: Router, public dialog: MatDialog) {}

  register(user: userRegister): void {
    console.log(user);
    this.validation(user);
    this.authService.register(user).subscribe(
      {
        next: () => {
          this.confirmRegister()
        },
        error: (err) => {
          if (err.error == 'User with this username is exist') {
            this.error[0] = 'This username already exists!';
          }
          console.log(err.error);
        }
      });
  }

  confirmRegister() {
    let dialogRef = this.dialog.open(AlertDialogComponent, {
      height: '200px',
      width: '400px',
      data: {message: 'Zostałeś pomyślnie zarejestrowany', type: 'simple'} 
    });
    dialogRef.afterClosed().subscribe(x =>{ 
        localStorage.clear();
        this.router.navigate(['/main']).then(() => window.location.reload());
    })
  }

  validation(user: userRegister) {
    this.error.forEach((element, index) => {
      this.error[index] = '';
    });    
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{1,}$/;
    if (!emailRegex.test(user.email)) {
      this.error[1] = "*Wrong e-mail format";
    }
    if (user.userName == '') {
      this.error[0] = '*';
    }
    if (user.email == '') {
      this.error[1] = '*';
    }
    if (user.password == '') {
      this.error[2] = '*';
    }
    if (user.confirmPassword == '' || user.confirmPassword != user.password) {
      this.error[3] = '*';
    }
    if (user.userType == '') {
      this.error[4] = '*';
    }
  }
}
