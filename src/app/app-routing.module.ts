import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { MainComponent } from './pages/main/main.component';
import { OneAnnouncementComponent } from './pages/one-announcement/one-announcement.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'main', component: MainComponent},
  {path: 'announcement/:id', component: OneAnnouncementComponent }
];

const wildcardRedirectsRoutes: Routes = [
  {
    path: '', redirectTo: 'main', pathMatch: 'full'
  },
  {
    path: '**', redirectTo: 'main'
  }
]
@NgModule({
  imports: [RouterModule.forRoot(routes.concat(wildcardRedirectsRoutes), { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [LoginComponent, RegisterComponent, MainComponent]