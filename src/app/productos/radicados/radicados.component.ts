import { Component, OnInit } from '@angular/core';
import { storage } from './../../Util/storage';

import { Radicado } from './../../models/Radicado';

@Component({
  selector: 'app-radicados',
  templateUrl: './radicados.component.html',
  styleUrls: ['./radicados.component.css']
})

export class RadicadosComponent implements OnInit {

  public listRadicado: Radicado[];
  public radicado: Radicado;

  constructor() {

    this.listRadicado = [];
    if (storage.exists("radicados")) {
      this.listRadicado = storage.get("radicados");
    }

  }

  ngOnInit() {
  }

  onDeleteRadicado(index: number) {
    if (index > -1) {
      this.listRadicado.splice(index, 1);
    }
    storage.set("radicados", this.listRadicado);
  }
}
