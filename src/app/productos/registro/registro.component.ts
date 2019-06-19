import { Component, OnInit } from '@angular/core';
import { storage } from './../../Util/storage';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { environment } from './../../../environments/environment';

import { Producto } from './../../models/Producto';
import { Productos } from './../../models/Productos';
import { Radicado } from './../../models/Radicado';

import { ProductosService } from './../../services/productos.service';

declare var JQuery: any;
declare var $: any;

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})

export class RegistroComponent implements OnInit {


  public alertType;
  public alertMessage;

  formGroup: FormGroup;
  public _storage: storage;

  public producto: Producto;
  public radicado: Radicado;

  public listRadicado: Radicado[];
  public listProductos: Productos[];

  constructor(
    private _formBuilder: FormBuilder,
    private _sproductos: ProductosService
  ) {
    this.listProductos = [];
    this.listRadicado = [];
    this.radicado = new Radicado();
    this.radicado.listaProductos = [];
    this.alertMessage = "";
    this.getProductos();
  }

  ngOnInit() {
    this.formGroup = this._formBuilder.group({
      nombre: [this.radicado.nombre, Validators.required],
      archivo: [this.radicado.archivo, Validators.required],
      ciudad: [this.radicado.ciudad, Validators.required],
      direccion: [this.radicado.direccion, Validators.required],
      fechaNacimiento: [this.radicado.fechaNacimiento, Validators.required]
    });
  }

  onSubmit() {

    let cantidad = 0;

    if (storage.exists("radicados")) {
      this.listRadicado = storage.get("radicados");
    }

    this.listRadicado.sort();

    this.radicado.id = this.listRadicado[this.listRadicado.length - 1].id + 1;

    if (this.radicado.listaProductos != null) {
      this.radicado.listaProductos.forEach(it => {
        cantidad += it.cantidad;
      });
    }
    if (cantidad > 0) {
      this.listRadicado.push(this.radicado);
      storage.set("radicados", this.listRadicado);
      this.alertType = "success";
      this.alertMessage = "Registro Exitoso";
    } else {
      this.alertType = "warning";
      this.alertMessage = "Debe seleccionar la cantidad deseada para los productos del catalogo";
    }
  }

  getProductos() {
    this._sproductos.getListaProductos().subscribe(
      response => {
        this.listProductos = response;
        if (this.listProductos != null && this.listProductos.length > 0) {
          for (let i = 0; i < this.listProductos.length; i++) {
            this.formGroup.addControl('producto' + this.listProductos[i].idProducto, new FormControl(''));
            this.radicado.listaProductos[i] = new Producto();
            this.radicado.listaProductos[i].id = this.listProductos[i].idProducto;
            this.radicado.listaProductos[i].cantidad = 0;
          }
        }
      },
      error => {
        console.log(error)
      }
    );
  }

  addFiles(event: FileList, name: string) {
    $('#' + name + 'Label').text("Seleccione Archivo");
    if (event != null && event.length > 0) {
      if (event.item(0).name.split(".")[event.item(0).name.split(".").length - 1].toLowerCase() == "pdf") {
        if (event.item(0).size <= environment.sizeFile) {
          $('#' + name + 'Label').text(event.item(0).name);
          this.alertType = "";
          this.alertMessage = "";
        } else {
          $('#' + name + 'Label').text("Seleccione Archivo");
          this.radicado.archivo = "";
          this.alertType = "danger";
          this.alertMessage = "Error en la carga de los documentos, revise el tipo o el tamaño del documento 'max " + environment.sizeFile + " B' ";
        }
      } else {
        $('#' + name + 'Label').text("Seleccione Archivo");
        this.radicado.archivo = "";
        this.alertMessage = "Error en la carga de los documentos, revise el tipo de documento.";
        this.alertType = "danger";
      }
    }
  }

  closeAlert() {
    this.alertType = "";
    this.alertMessage = "";
  }
}
