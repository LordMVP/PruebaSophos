import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { CatalogoComponent } from './productos/catalogo/catalogo.component';
import { RegistroComponent } from './productos/registro/registro.component';
import { RadicadosComponent } from './productos/radicados/radicados.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CatalogoComponent,
    RegistroComponent,
    RadicadosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
