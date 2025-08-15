import { Component, inject } from '@angular/core';
import { UserApi } from '../../services/User/user-api';
import { TaskApi } from '../../services/Task/task-api';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  private user = inject(UserApi);
  private task = inject(TaskApi);

   autenticarUsuario(){
    console.log(this.user.autenticar().subscribe({
      next: (data) => console.log(data),
      error: err => console.error(err)
    }))
  }

  getDadosUsuario(){
    console.log(this.user.getDadosUsuario().subscribe({
      next: (data) => console.log(data.dadosUsuario.nome),
      error: err => console.error(err)
    }))
  }

  setUsuario(){
    console.log(this.user.criarUsuario().subscribe({
      next: data => console.log(data),
      error: err => console.error(err)
    }))
  }

  getTask(){
    console.log(this.task.getTask().subscribe({
      next: data => console.log(data),
      error: err => console.error(err)
    }))
  }

  criarTask(){
    console.log(this.task.criarTask().subscribe({
      next: data => console.log(data),
      error: err => console.error(err)
    }))
  }
}
