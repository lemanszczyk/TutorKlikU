import { Component, ViewEncapsulation } from '@angular/core';
import { SuperHero } from './models/super-hero';
import { SuperHeroService } from './services/super-hero.service';
import { AuthService } from './services/auth.service';
import { User } from './models/userLogin';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  title = 'TutorKlikUI';

  constructor() {}

}
