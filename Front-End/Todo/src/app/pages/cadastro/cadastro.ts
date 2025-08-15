import { Component, inject } from '@angular/core';
import { UserApi } from '../../services/User/user-api';

@Component({
  selector: 'app-cadastro',
  imports: [],
  templateUrl: './cadastro.html',
  styleUrl: './cadastro.css'
})
export class Cadastro {
  private user = inject(UserApi);

    setUsuario(){
    console.log(this.user.criarUsuario().subscribe({
      next: data => console.log(data),
      error: err => console.error(err)
    }))
  }
}
