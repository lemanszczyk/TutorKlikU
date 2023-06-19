import { Component } from '@angular/core';
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
  constructor(private superHeroService: SuperHeroService, private authService: AuthService) {}
  // getMe(){
  //   this.superHeroService
  //   .getSuperHeroes()
  //   .subscribe((result: SuperHero[]) => (this.heroes = result));
  // }

  register(user: User) {
    this.authService.register(user).subscribe();
  }

  login(user: User) {
    this.authService.login(user).subscribe((token: string) => {
      localStorage.setItem('authToken', token);
      
    });
  }
}
