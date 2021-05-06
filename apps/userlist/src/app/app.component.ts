import { Component } from '@angular/core';

@Component({
  selector: 'jwtapi-frontend-root',
  template: `
  <div class="nav">
    <ul>
      <li>
        <a routerLink="/login">Logowanie</a>      
      </li>
      <li>
        <a routerLink="/userlist">Lista użytkowników</a>      
      </li>
    </ul>
  </div>
  <router-outlet></router-outlet>`,
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Lista użytkowników';
}
