import { Component, OnInit } from '@angular/core';

import { Productos } from './../../models/Productos';
import { ProductosService } from './../../services/productos.service';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})
export class CatalogoComponent implements OnInit {

  public listProductos: Productos[];

  constructor(
    private _sproductos: ProductosService
  ) {
    this.listProductos = [];
    this.getProductos();
  }

  ngOnInit() {
  }


  getProductos() {
    this._sproductos.getListaProductos().subscribe(
      response => {
        this.listProductos = response;
      },
      error => {
        console.log(error)
      }
    );
  }

}
