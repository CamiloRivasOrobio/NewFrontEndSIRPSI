import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EstadosService {

  private readonly baseUrl: string = environment.baseUrl;
  private http = inject( HttpClient );

  constructor() { }

  getEstados(): Observable<any[]>{
    const urlEstados = `${this.baseUrl}/estados/ConsultarEstados`;
    const token = localStorage.getItem('token');
        
    const headers = new HttpHeaders()
    .set('Authorization', `Bearer  ${token}`);
  return this.http.get<any>(urlEstados, {headers});
  }
}
