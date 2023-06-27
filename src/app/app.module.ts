import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select'
import { MatInputModule } from '@angular/material/input';
import { AppRoutingModule,  routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { AuthInterceptor } from './services/auth.interceptor';
import { MainComponent } from './pages/main/main.component';
import { AnnouncementComponent } from './components/announcement/announcement.component';
import { OneAnnouncementComponent } from './pages/one-announcement/one-announcement.component';
import { ManagementUserComponent } from './pages/management-user/management-user.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommentComponent } from './components/comment/comment.component';
import { AddCommentDialogComponent } from './components/add-comment-dialog/add-comment-dialog.component'
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    MainComponent,
    AnnouncementComponent,
    OneAnnouncementComponent,
    ManagementUserComponent,
    CommentComponent,
    AddCommentDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDialogModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
