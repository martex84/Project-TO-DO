import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserApi {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  autenticar() : Observable<any> {
    return this.http.get(this.baseUrl + '/user/authenticate', {
      headers: {
        email: "teste@teste",
        password: "teste"
      },
    });
  }

  getDadosUsuario() : Observable<any>{
    return this.http.get(this.baseUrl + '/user', {
      headers: {
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RlQHRlc3RlIiwicGFzc3dvcmQiOiJ0ZXN0ZSIsImlhdCI6MTc1NTI5NzU2MCwiZXhwIjoxNzU1MzAxMTYwfQ.wBTgY_entHq5-_q-qMNxUu8Q2qNmRvGKG4kPFzdDsEw"
      }
    })
  }

  criarUsuario(): Observable<any>{
    const body = {};
    const headers = {
      nome: "testeAngular",
      email: "testeAngular@teste",
      password: "angular"
    }

    return this.http.post(this.baseUrl + "/user",
      body, {headers: headers})
  }
}
