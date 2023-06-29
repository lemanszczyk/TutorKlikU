import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SuperHero } from 'src/app/models/super-hero';
import { User } from 'src/app/models/userLogin';
import { AuthService } from 'src/app/services/auth.service';
import { SuperHeroService } from 'src/app/services/super-hero.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent {
  user = new User();
  errorLogin: string = '';
  errorPass: string = '';
  error: string = '';
  constructor(private authService: AuthService, private router: Router) {}

  login(user: User) {
    this.authService.login(user).subscribe({  
      next: (token: string) => {
        localStorage.setItem('authToken', token);
        this.router.navigate(['/main']).then(() => window.location.reload());
      },
      error: (err: any) => {
        let arrayData: any;

        try {
          arrayData = JSON.parse(err.error);
        } catch (jsonError) {
          console.error('NOT Json');
        }

        this.errorPass = '';
        this.errorLogin = '';
        this.error = '';

        if (arrayData == undefined) {
          arrayData = 'test';
          this.error = err.error;
        }
        if (arrayData.errors && arrayData.errors.Password && arrayData.errors.Password[0]) {
          this.errorPass = arrayData.errors.Password[0];
        }
        if (arrayData.errors && arrayData.errors.UserName && arrayData.errors.UserName[0]) {
          this.errorLogin = arrayData.errors.UserName[0];
        }

        console.log(err.error);
      }
    });
  }
}
