import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent, AuthGuardService } from '@jwtapi-frontend/jwtapi-lib';
import { AdduserComponent } from './adduser/adduser.component';
import { FourohfourComponent } from './fourohfour/fourohfour.component';

const routes: Routes = [
//   { path: 'dashboard', component: DashboardComponent},
//   { path: 'heroes', component: HeroesComponent },
//   { path: 'details/:id', component: HeroDetailComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent, data: { route: "/adduser" }},
  { path: 'adduser', component: AdduserComponent, canActivate: [AuthGuardService] },
  { path: '**', component: FourohfourComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
