import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Authenticate } from '../Authenticate/authenticate';

@Injectable({
  providedIn: 'root'
})
export class TaskApi {
  private baseUrl = 'http://localhost:3000';

  private authenticate = inject(Authenticate);

  constructor(private http: HttpClient) {}

  getTask() : Observable<any>{
    const header = {
      token: this.authenticate.getToken()
    }

    return this.http.get(this.baseUrl + "/task",
      {headers: header}
    )
  }

  criarTask(descricao: string, status: string) : Observable<any>{
    const body = {};
    
    const header = {
      token: this.authenticate.getToken(),
      descricao: descricao,
      status: status
    }

    return this.http.post(this.baseUrl + "/task", body, {
      headers: header
    })
  }
}
