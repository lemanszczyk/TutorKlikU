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
  constructor(private authService: AuthService, private router: Router) {}

  login(user: User) {
    this.authService.login(user).subscribe({  
      next: (token: string) => {
        localStorage.setItem('authToken', token);
        this.router.navigate(['/main']);
      },
      error: (err: any) => {
        console.log(err.error);
      }
    });
  }
}
