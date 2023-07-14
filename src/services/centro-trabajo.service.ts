import { HttpClient, HttpHeaders } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class CentroTrabajoService {
  private readonly baseUrl: string = environment.baseUrl;

  private http = inject(HttpClient);

  constructor() {}

  getCentroTrabajo(companie?: number): Observable<any> {
    const urlGetCentroTrabajo =
      `${this.baseUrl}/centrotrabajo/ConsultarCentroDeTrabajo` +
      (companie != undefined ? "?companie=" + companie : "");
    const token = localStorage.getItem("token");

    const headers = new HttpHeaders().set("Authorization", `Bearer  ${token}`);

    return this.http.get(urlGetCentroTrabajo, { headers });
  }
  saveCentroTrabajo(body: any): Observable<any> {
    const headers = new HttpHeaders().set(
      "Authorization",
      `Bearer  ${localStorage.getItem("token")}`
    );
    return this.http.post(
      `${this.baseUrl}/centrotrabajo/RegistrarCentroDeTrabajo`,
      body,
      { headers }
    );
  }
  getCentroTrabajoUsuario(user?: string): Observable<any> {
    const headers = new HttpHeaders().set(
      "Authorization",
      `Bearer  ${localStorage.getItem("token")}`
    );
    return this.http.get(
      `${this.baseUrl}/userWorkPlace/ConsultarCentroDeTrabajoUsuario?user=` +
        user,
      { headers }
    );
  }
  saveCentroTrabajoUsuario(body: any): Observable<any> {
    const headers = new HttpHeaders().set(
      "Authorization",
      `Bearer  ${localStorage.getItem("token")}`
    );
    return this.http.post(
      `${this.baseUrl}/userWorkPlace/RegistrarCentroDeTrabajoUsuario`,
      body,
      { headers }
    );
  }
}
