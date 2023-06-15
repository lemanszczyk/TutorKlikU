import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule,  routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { AuthInterceptor } from './services/auth.interceptor';
import { MainComponent } from './pages/main/main.component';
import { AnnouncementComponent } from './components/announcement/announcement.component';
import { OneAnnouncementComponent } from './pages/one-announcement/one-announcement.component';
import { ManagementUserComponent } from './pages/management-user/management-user.component'

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    MainComponent,
    AnnouncementComponent,
    OneAnnouncementComponent,
    ManagementUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
