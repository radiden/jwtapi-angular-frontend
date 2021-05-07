import { Component, OnInit } from '@angular/core';
import Fuse from 'fuse.js';

import { ClientService } from '../client.service'

import { Client } from 'libs/jwtapi-lib/src/models/clientmodel';

// const Fuse = require("fuse.js");

@Component({
  selector: 'jwtapi-frontend-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.scss']
})
export class UserlistComponent implements OnInit {
  constructor(private clientService: ClientService) { }
  errorText: string;

  fullClients: Client[];
  clients: Client[];

  fuse: Fuse<Client>;

  ngOnInit(): void {
    this.clientService.getClients().toPromise().then(res => {
      if (res == undefined) {
        this.errorText = "Nie udało się pobrać listy klientów.";
      }
      this.fullClients = res;
      this.clients = this.fullClients;
      this.fuse = new Fuse(this.clients, {
        keys: ['id', 'name', 'surname']
      })
    });
  }

  search(filter: string): void {
    if (filter != "") {
      let result = this.fuse.search(filter);
      this.clients = [];
      result.forEach(elem => {
        this.clients.push(elem.item);
      })
    } else {
      this.clients = this.fullClients;
    }
  }

  delete(id: number): void {
    this.clients = this.clients.filter(c => c.id != id);
    this.fullClients = this.fullClients.filter(c => c.id != id);
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
