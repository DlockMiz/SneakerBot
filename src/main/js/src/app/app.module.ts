import { BrowserModule } from '@angular/platform-browser';
import {Inject, NgModule} from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MAT_DIALOG_DATA,
  MatButtonModule, MatButtonToggleModule,
  MatCardModule, MatDialogModule, MatExpansionModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule, MatRadioModule,
  MatSelectModule,
  MatTabsModule, MatToolbarModule
} from '@angular/material';
import { BillingComponent } from './billing/billing.component';
import { ProxiesComponent } from './proxies/proxies.component';
import { ProfileComponent } from './profile/profile.component';
import { CaptchaComponent } from './captcha/captcha.component';
import {FlexModule} from '@angular/flex-layout';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AddTaskComponent } from './add-task/add-task.component';
import {HttpClientModule} from '@angular/common/http';
import {TaskServiceService} from './Service/task-service.service';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    BillingComponent,
    ProxiesComponent,
    ProfileComponent,
    CaptchaComponent,
    AddTaskComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatFormFieldModule,
    MatCardModule,
    MatIconModule,
    FlexModule,
    MatListModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatButtonModule,
    MatExpansionModule,
    FormsModule,
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
// App route has to be the last route
    AppRoutingModule,
    MatRadioModule,
    MatButtonToggleModule,
    MatDialogModule,
    MatToolbarModule
  ],
  entryComponents: [AddTaskComponent],
  providers: [TaskServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
