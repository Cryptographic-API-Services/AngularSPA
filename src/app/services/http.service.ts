import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthGuardService } from './auth-guard.service';
import { catchError, throwError } from 'rxjs';
import { NavbarEmitterService } from './navbar-emitter.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
    private http: HttpClient,
    private authGuard: AuthGuardService,
    private navbarEmitterService: NavbarEmitterService
    ) { }

  public get(url: string) {
    return this.http.get(url);
  }

  public getAuthenticated(url: string) {
    return this.http.get(url, this.getAuthHeader()).pipe(
      catchError((error) => {
        return this.handleError(error);
      })
    );
  }

  public post(url: string, body: object) {
    return this.http.post(url, body);
  }

  public postAuthenticated(url: string, body: object) {
    return this.http.post(url, body, this.getAuthHeader()).pipe(
      catchError((error) => {
        return this.handleError(error);
      })
    );;
  }

  public put(url: string, body: object) {
    return this.http.put(url, body);
  }

  public putAuthenticated(url: string, body: any) {
    return this.http.put(url, body, this.getAuthHeader()).pipe(
      catchError((error) => {
        return this.handleError(error);
      })
    );;
  }

  public delete(url: string, body: object) {
    return this.http.delete(url, body);
  }

  public deleteAuthenticated(url: string, body: any) {
    let headers = this.getAuthHeader();
    headers.body = body;
    return this.http.delete(url, headers).pipe(
      catchError((error) => {
        return this.handleError(error);
      })
    );;
  }

  private getAuthHeader(): any {
    var header = {
      headers: new HttpHeaders()
        .set('Authorization',  `Bearer ${this.authGuard.getToken()}`)
    }
    return header;
  }

  private handleError(error: any) {
    if (error.status === 401) {
      this.authGuard.unauthorizedLogout();
      this.navbarEmitterService.emitter.emit("user-logged-out");
    }
    return throwError(error);
  }
}
