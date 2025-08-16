import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class Authenticate {

  constructor(private router: Router){}

  /**
   * Verifica e retorna o token armazenado no localstorage, mas caso não encontre irá enviar para a tela de login
   * @returns 
   */
  getToken() : string{
    const dadosLocalStorage = localStorage.getItem("token");

    if(dadosLocalStorage){
      const dadosToken = JSON.parse(dadosLocalStorage);

      if(dadosToken.token) return dadosToken.token
    }

    alert("Sessão expirada ou inválida");

    //Caso não ache o token
    this.router.navigate(['/']);

    return ""
  }

  /**
   * Salva o token captado no local storage
   * @param token Recebe o token que será inserido no local storage
   */
  setToken(token: string){
    if(!token) throw new Error("Falha ao captar o token");

    localStorage.setItem("token", JSON.stringify({token}))

    return true
  }
}
