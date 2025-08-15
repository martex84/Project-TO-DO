import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskApi {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RlQHRlc3RlIiwicGFzc3dvcmQiOiJ0ZXN0ZSIsImlhdCI6MTc1NTMwMTIyMywiZXhwIjoxNzU1MzA0ODIzfQ.DsnfdBQcVR6AvEUQgX4ftpjVIqLB5D_2VB0AZYbI5Ec"

  getTask() : Observable<any>{
    const header = {
      token: this.token
    }

    return this.http.get(this.baseUrl + "/task",
      {headers: header}
    )
  }

  criarTask() : Observable<any>{
    const body = {};
    
    const header = {
      token: this.token,
      descricao: "Descrição Angular",
      status: "Alta"
    }

    return this.http.post(this.baseUrl + "/task", body, {
      headers: header
    })
  }
}
