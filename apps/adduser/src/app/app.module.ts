import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { JwtapiLibModule } from '@jwtapi-frontend/jwtapi-lib';
import { JwtModule } from '@auth0/angular-jwt';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { TokenCombo } from 'libs/jwtapi-lib/src/models/tokencombomodel';
import { FourohfourComponent } from './fourohfour/fourohfour.component';
import { AdduserComponent } from './adduser/adduser.component';

export function tokenGetter(): string {
  var tokenInfo: TokenCombo = JSON.parse(localStorage["tokenInfo"]);
  return tokenInfo.token;
}

@NgModule({
  declarations: [AppComponent, FourohfourComponent, AdduserComponent],
  imports: [
    FormsModule,
    BrowserModule,
    JwtapiLibModule,
    HttpClientModule,
    AppRoutingModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["localhost:5000"]
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
