import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Cadastro } from './pages/cadastro/cadastro';
import { Task } from './pages/task/task';

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
