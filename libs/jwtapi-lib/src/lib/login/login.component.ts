import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { LoginService } from '../login.service';

import { Login } from '../../models/loginmodel';

@Component({
  selector: 'lib-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  @Input() details?: Login = new Login("", "");
  route: string;
  submitted: boolean = false;
  showError: boolean = false;

  constructor(private loginService: LoginService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(data => {
      this.route = data.route;
    })
  }

  login(): void {
    localStorage["tokenInfo"] = "{}";
    this.loginService.getToken(this.details).subscribe(combo => {
      if (combo != null) {
        localStorage["tokenInfo"] = JSON.stringify(combo);
        if (this.route) {
          this.router.navigate([this.route]);
        }
      } else {
        this.showError = true;
      }
    });
  }
}
