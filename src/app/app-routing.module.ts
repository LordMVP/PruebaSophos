import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CatalogoComponent } from './productos/catalogo/catalogo.component';
import { RegistroComponent } from './productos/registro/registro.component';
import { RadicadosComponent } from './productos/radicados/radicados.component';

const routes: Routes = [

  { path: 'productos/catalogo', component: CatalogoComponent },
  { path: 'productos/registro', component: RegistroComponent },
  { path: 'productos/radicados', component: RadicadosComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
