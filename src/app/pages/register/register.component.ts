import { Component } from '@angular/core';
import { userRegister } from 'src/app/models/userRegister';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user = new userRegister();
  constructor(private authService: AuthService, private router: Router) {}

  register(user: userRegister): void {
    console.log(user);
    this.authService.register(user).subscribe(
      {
        next: () => {
            this.router.navigate(['/main']);
        },
        error: (err) => {
          console.log(err.error);
        }
      });
  }
}
