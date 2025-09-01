import { Routes } from '@angular/router';
import { Login } from '../subdomains/user/containers/login/login';
import { Cadastro } from '../subdomains/user/containers/cadastro/cadastro';
import { Task } from '../subdomains/task/containers/task/task';

export const routes: Routes = [
  {
    path: '',
    component: Login,
  },
  {
    path: 'cadastro',
    component: Cadastro
  },
  {
    path: 'task',
    component: Task
  }
];
