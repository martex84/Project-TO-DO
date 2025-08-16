import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Authenticate } from '../Authenticate/authenticate';

@Injectable({
  providedIn: 'root',
})
export class UserApi {
  private baseUrl = 'http://localhost:3000';

  private authenticate = inject(Authenticate);

  constructor(private http: HttpClient) {}

  autenticar(email: string, password: string) : Observable<any> {
    return this.http.get(this.baseUrl + '/user/authenticate', {
      headers: {
        email: email,
        password: password
      },
    });
  }

  getDadosUsuario() : Observable<any>{
    return this.http.get(this.baseUrl + '/user', {
      headers: {
        token: this.authenticate.getToken()
      }
    })
  }

  criarUsuario(nome: string, email: string, password: string): Observable<any>{
    const body = {};
    const headers = {
      nome: nome,
      email: email,
      password: password
    }

    return this.http.post(this.baseUrl + "/user",
      body, {headers: headers})
  }
}
