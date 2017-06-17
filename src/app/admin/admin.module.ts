import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';

// Network services 
import { AlertService, AuthenticationService, UserService } from '../shared/services';
import { LoginGuard } from '../shared/guards/login.guard';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { LoginDialogComponent } from './login-dialog/login-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  declarations: [
    AdminComponent,
    WelcomeComponent,
    LoginDialogComponent
  ],
  entryComponents: [
    LoginDialogComponent
  ]
})
export class AdminModule { }
