import { Injectable, inject, signal, computed } from "@angular/core";
import { environment } from "../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable, throwError, of, BehaviorSubject } from "rxjs";
import { User } from "src/app/interface";
import { AuthStatus } from "src/app/interface/auth-status.enum";
import { LoginResponse } from "../app/interface/login.response.interface";
import { map, catchError } from "rxjs/operators";
import { Router } from "@angular/router";
import Swal from "sweetalert2";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private readonly baseUrl: string = environment.baseUrl;
  private http = inject(HttpClient);
  private _currentUser = signal<User | null>(null);
  private _authStatus = signal<AuthStatus>(AuthStatus.checking);
  public currentUser = computed(() => this._currentUser());
  public authStatus = computed(() => this._authStatus());
  token: string;
  private userSubject: BehaviorSubject<LoginResponse | any>;
  public get userData(): LoginResponse {
    return this.userSubject.value;
  }

  constructor(public router: Router) {
    var session =
      sessionStorage["token"] == undefined
        ? null
        : JSON.parse(sessionStorage["token"]);
    this.userSubject = new BehaviorSubject<LoginResponse>(session);
  }

  private setAuthentication(
    user: User,
    token: string,
    role: string,
    id: string
  ): boolean {
    this._currentUser.set(user);
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    localStorage.setItem("id", id);
    this._authStatus.set(AuthStatus.autheticated);
    localStorage.getItem("token");
    return true;
  }

  // login(nit: string, document: string, password: string): Observable<boolean> {
  //   const url = `${this.baseUrl}/user/Login`;
  //   const body = { nit, document, password };
  //   return this.http.post<LoginResponse>(url, body).pipe(
  //     map(({ user, token, roleId, id }) =>
  //       this.setAuthentication(user, token, roleId, id)
  //     ),
  //     catchError((err) => {
  //       console.log(err);
  //       return throwError(() => err.error.message);
  //     })
  //   );
  // }

  checkAuthService(): Observable<boolean> {
    // const url = `$this.`
    const token = localStorage.getItem("token");
    if (!token) {
      return of(false);
    } else {
      return of(true);
    }
  }

  // logout() {
  //   localStorage.removeItem("token");
  // }
  public login(
    nit: string,
    document: string,
    password: string
  ): Observable<LoginResponse> {
    const body = { nit, document, password };
    return this.http
      .post<LoginResponse>(environment.baseUrl + "/user/Login", body)
      .pipe(
        map((res) => {
          const user = ({ user, token, roleId, id }) => res;
          this.CreateUserSession(res);
          return res;
        }),
        catchError((err) => {
          console.log(err);
          return throwError(() => err.error.message);
        })
      );
  }
  public CreateUserSession(auth: any, ) {
    localStorage.setItem("user", JSON.stringify(auth));
    localStorage.setItem("token", auth.token);
    localStorage.setItem("role", auth.role);
    localStorage.setItem("id", auth.id);
    this.userSubject.next(auth);
    Swal.fire({
      icon: "success",
      title: "Se ha iniciado sesión correctamente.",
      showConfirmButton: false,
      timer: 1300,
    }).then(() => this.ValidateSesion());
  }
  public logout() {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("id");
    this.userSubject.next(null);
    // this.ValidateSesion();
    // window.location.reload();
  }
  public ValidateSesion() {
    if (this.userData) {
      this.router.navigate(["/"]);
    }
  }
}
