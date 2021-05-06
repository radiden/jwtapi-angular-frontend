import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent, AuthGuardService } from '@jwtapi-frontend/jwtapi-lib';
import { FourohfourComponent } from './fourohfour/fourohfour.component';
import { UserlistComponent } from './userlist/userlist.component';

const routes: Routes = [
//   { path: 'dashboard', component: DashboardComponent},
//   { path: 'heroes', component: HeroesComponent },
//   { path: 'details/:id', component: HeroDetailComponent },
  { path: '', redirectTo: '/userlist', pathMatch: 'full'},
  { path: 'login', component: LoginComponent },
  { path: 'userlist', component: UserlistComponent, canActivate: [AuthGuardService] },
  { path: '**', component: FourohfourComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
