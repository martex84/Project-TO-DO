import { Component, inject } from '@angular/core';
import { UserApi } from '@shared/services/User/user-api';
import { Router } from '@angular/router';
import { Authenticate } from '@shared/services/Authenticate/authenticate';

@Component({
  selector: 'app-cadastro',
  imports: [],
  templateUrl: './cadastro.html',
  styleUrl: './cadastro.css',
})
export class Cadastro {
  private user = inject(UserApi);
  private authenticate = inject(Authenticate);

  constructor(private router: Router){}

  dadosInput = {
    nome: '',
    email: '',
    password: '',
  };

  setUsuario() {
    if(!this.dadosInput.nome) return alert("Digite o nome")
    if(!this.dadosInput.email) return alert("Digite o email")
    if(!this.dadosInput.password) return alert("Digite a senha")

    this.user.criarUsuario(this.dadosInput.nome, this.dadosInput.email, this.dadosInput.password).subscribe({
        next: (data) => {
          const token = data.token;

          if(!token) throw new Error("Falha ao captar o token");

          this.authenticate.setToken(token);

          this.router.navigate(['/task']);
        },
        error: (err) => console.error(err),
      })
  }

  getNomeInput(event: Event){
    const target = event.target as HTMLInputElement;

    if(!target) throw new Error("Falha ao captar o target")

    this.dadosInput.nome = target.value;
  }

  getEmailInput(event: Event){
    const target = event.target as HTMLInputElement;

    if(!target) throw new Error("Falha ao captar o target")

    this.dadosInput.email = target.value;
  }

  getPasswordInput(event: Event){
    const target = event.target as HTMLInputElement;

    if(!target) throw new Error("Falha ao captar o target")

    this.dadosInput.password = target.value;
  }
}
