import { Component, inject, OnInit } from '@angular/core';
import { TaskApi } from '@shared/services/Task/task-api';
import { UserApi } from '@shared/services/User/user-api';

interface DadosTask {
  id: number,
  descricao: string,
  status: string
}

@Component({
  selector: 'app-task',
  imports: [],
  templateUrl: './task.html',
  styleUrl: './task.css'
})
export class Task implements OnInit {
    private user = inject(UserApi);
    private task = inject(TaskApi);

    dadosUsuario = {
      nome: "Nome teste"
    }

    dadosInputTask = {
      descricao: "",
      status: ""
    }

    listaTask : DadosTask[] = []

    ngOnInit(): void {
        this.getDadosUsuario();
    }

    getDadosUsuario(){
    console.log(this.user.getDadosUsuario().subscribe({
      next: (data) => {
        const nome = data.dadosUsuario.nome;

        if(!nome) return console.error("Falha ao captar o nome do usuário");

        this.dadosUsuario.nome = nome;
      },
      error: err => console.error(err)
    }))
  }

  getTask(){
    console.log(this.task.getTask().subscribe({
      next: data =>{
        const tasks = data.tasks as DadosTask[];
        
        if(!tasks) throw new Error("Falha na busca das tasks");

        this.listaTask = [];

        tasks.forEach((item, index) => {
          this.listaTask.push({
            id: index,
            descricao: item.descricao,
            status: item.status
          })
        })

      },
      error: err => console.error(err)
    }))
  }

  criarTask(){
    if(!this.dadosInputTask.descricao) return alert("Informe a descrição da task");
    if(!this.dadosInputTask.status) return alert("Informe a priodidade da task");

    console.log(this.task.criarTask(this.dadosInputTask.descricao, this.dadosInputTask.status).subscribe({
      next: data => {
        alert("Task cadastrada com sucesso");

        this.getTask();
      },
      error: err => console.error(err)
    }))
  }

  getDescricaoInputTask(event: Event){
    const target = event.target as HTMLInputElement;

    if(!target) throw new Error("Falha ao captar o target")

    this.dadosInputTask.descricao = target.value;
  }

    getStatusInputTask(event: Event){
    const target = event.target as HTMLInputElement;

    if(!target) throw new Error("Falha ao captar o target")

    this.dadosInputTask.status = target.value;
  }
}
