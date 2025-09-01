import { Component, inject } from '@angular/core';
import { UserApi } from '@shared/services/User/user-api';
import { TaskApi } from '@shared/services/Task/task-api';
import {ɵInternalFormsSharedModule } from '@angular/forms';
import { Authenticate } from '@shared/services/Authenticate/authenticate';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ɵInternalFormsSharedModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private user = inject(UserApi);
  private task = inject(TaskApi);
  private authenticate = inject(Authenticate);

  constructor(private router: Router){}

  dadosInput = {
    email: "",
    password: ""
  }

  autenticarUsuario() {
    if (!this.dadosInput.email) return alert('Digite o e-mail');
    if (!this.dadosInput.password) return alert('Digite a senha');

    this.user.autenticar(this.dadosInput.email, this.dadosInput.password).subscribe({
        next: (data) => {

          const token = data.token;

          if(!token) return console.error("Falha ao captar o token");

          this.authenticate.setToken(token);

          this.router.navigate(['/task']);
        },
        error: (err) => console.error(err),
      })
  }

  getEmail(event: Event) {
    const target = event.target as HTMLInputElement;

    if(!target) throw new Error("Falha ao captar o target")

    this.dadosInput.email = target.value;
  }

  getPassword(event: Event) {
    const target = event.target as HTMLInputElement;

    if(!target) throw new Error("Falha ao captar o target")

    this.dadosInput.password = target.value;
  }

  cadastrar(){
    this.router.navigate(['/cadastro']);
  }
}
