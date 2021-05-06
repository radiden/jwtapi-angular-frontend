import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { JwtModule } from "@auth0/angular-jwt";
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { JwtapiLibModule } from '@jwtapi-frontend/jwtapi-lib';
import { FourohfourComponent } from './fourohfour/fourohfour.component';
import { UserlistComponent } from './userlist/userlist.component'
import { TokenCombo } from 'libs/jwtapi-lib/src/models/tokencombomodel';

export function tokenGetter(): string {
  var tokenInfo: TokenCombo = JSON.parse(localStorage["tokenInfo"]);
  return tokenInfo.token;
}

@NgModule({
  declarations: [AppComponent, FourohfourComponent, UserlistComponent],
  imports: [
    BrowserModule,
    JwtapiLibModule,
    AppRoutingModule,
    HttpClientModule,
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
