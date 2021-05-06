import { Component, OnInit } from '@angular/core';

import { ClientService } from '../client.service'

import { Client } from 'libs/jwtapi-lib/src/models/clientmodel';

@Component({
  selector: 'jwtapi-frontend-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.scss']
})
export class UserlistComponent implements OnInit {
  constructor(private clientService: ClientService) { }
  errorText: string;

  clients: Client[]

  ngOnInit(): void {
    this.clientService.getClients().subscribe(res => this.clients = res)
  }

  delete(id: number): void {
    this.clients = this.clients.filter(c => c.id != id);
    this.clientService.deleteClient(id).subscribe(res => {
      if (res == undefined) {
        this.showError(id);
      }
    });
  }
  private showError(id: number): void {
    this.errorText = `Nie udało się usunąć klienta ID ${id}.`;
  }
}
