import { Component } from '@angular/core';
import { SuperHero } from './models/super-hero';
import { SuperHeroService } from './services/super-hero.service';
import { AuthService } from './services/auth.service';
import { User } from './models/userLogin';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TutorKlikUI';
  heroes: SuperHero[] = [];

  user = new User();
  
  constructor(private superHeroService: SuperHeroService, private authService: AuthService) {}

  getMe(){
    this.superHeroService
    .getSuperHeroes()
    .subscribe((result: SuperHero[]) => (this.heroes = result));
  }

  register(user: User) {
    this.authService.register(user).subscribe();
  }

  login(user: User) {
    this.authService.login(user).subscribe((token: string) => {
      localStorage.setItem('authToken', token);
    });
  }
}
