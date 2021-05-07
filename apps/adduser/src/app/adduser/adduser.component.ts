import { Component, Input, OnInit } from '@angular/core';

import { Client } from 'libs/jwtapi-lib/src/models/clientmodel';
import { ClientService } from '../client.service';

@Component({
  selector: 'jwtapi-frontend-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.scss']
})
export class AdduserComponent implements OnInit {
  @Input() details?: Client = {
    id: 0,
    name: "",
    surname: ""
  };
  message = { type: "", content: "" }

  constructor(private clientService: ClientService) { }

  ngOnInit(): void {
  }

  addUser(details: Client): void {
    this.clientService.addClient(details).subscribe(res => {
      if (res != null) {
        this.message = {
          type: "success",
          content: `Dodano klienta ${details.name} ${details.surname}!`
        }
      } else {
        this.message = {
          type: "warning",
          content: "Dodawanie klienta nie powiodło się."
        }
      }
    });
  }

}
