import { Component, OnInit, Input } from '@angular/core';

import { LoginService } from '../login.service';

import { Login } from '../../models/loginmodel';

@Component({
  selector: 'lib-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @Input() details?: Login = new Login("", "");
  submitted: boolean = false;
  showError: boolean = false;

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
  }

  login(): void {
    this.submitted = true;
    if(this.loginService.login(this.details)) {
      this.submitted = false;
      this.showError = true;
    }
  }
}
