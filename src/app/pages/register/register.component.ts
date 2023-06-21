import { Component } from '@angular/core';
import { userRegister } from 'src/app/models/userRegister';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user = new userRegister();
  constructor(private authService: AuthService) {}

  // register(user: userRegister): void {
  //   console.log(user);
  //   this.authService.register(user).subscribe(
  //     (result: any) => {
  //     console.log(result.status);
  //     if (result.status === 200){
  //       console.log(result);
  //     }
  //   }, (error) => {
  //     console.log(error.error);
  //   });
  // }

  register(user: userRegister): void {
    console.log(user);
    this.authService.register(user).subscribe(
      {
        next: (result: any) => {
          console.log(result.status);
          if (result.status === 200){
            console.log(result);
          }
        },
        error: (error) => {
          console.log(error.error);
        }
      })
  }
}
