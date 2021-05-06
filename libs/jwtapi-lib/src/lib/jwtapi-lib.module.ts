import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [CommonModule, HttpClientModule, FormsModule],
  declarations: [
    LoginComponent
  ],
  exports: [
    LoginComponent
  ],
})
export class JwtapiLibModule {}
