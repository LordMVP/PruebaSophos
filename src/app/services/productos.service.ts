
import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class ProductosService {

  private url;
  private headers = new HttpHeaders();

  constructor(private _http: HttpClient) {
    this.conectionConfig();
    this.headers.append('Cache-control', 'no-cache');
    this.headers.append('Cache-control', 'no-store');
    this.headers.append('Expires', '0');
    this.headers.append('Pragma', 'no-cache');
  }

  //Config conection services
  private conectionConfig(): void {
    this.url = environment.endPointCatalogo;
  }

  public getListaProductos() {
    let params = new HttpParams();
    return this._http.get<any>(this.url, { headers: this.headers, params: params }).pipe(map(res => res));
  }
}
