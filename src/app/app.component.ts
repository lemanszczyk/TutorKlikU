import { Component, ViewEncapsulation } from '@angular/core';
import { SuperHero } from './models/super-hero';
import { SuperHeroService } from './services/super-hero.service';
import { AuthService } from './services/auth.service';
import { User } from './models/user';
import { UserService } from './services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  title = 'TutorKlikUI';
  user = new User();
  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    if (localStorage.length === 0)
    {
      return;
    }
    this.userService.getUser().subscribe( x => {
      this.user = x;
    })
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/main']).then(() => window.location.reload());
  }

}
