import { Component, inject } from '@angular/core';
import { TaskApi } from '../../services/Task/task-api';
import { UserApi } from '../../services/User/user-api';

@Component({
  selector: 'app-task',
  imports: [],
  templateUrl: './task.html',
  styleUrl: './task.css'
})
export class Task {
    private user = inject(UserApi);
    private task = inject(TaskApi);

    dadosUsuario = {
      nome: "Nome teste"
    }



    getDadosUsuario(){
    console.log(this.user.getDadosUsuario().subscribe({
      next: (data) => console.log(data.dadosUsuario.nome),
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
