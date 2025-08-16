# 📌 Projeto Fullstack - TODO

Este repositório contém duas aplicações que são utilizadas no projeto TODO:  
- **Backend**: Node.js + TypeScript  
- **Frontend**: Angular  

O objetivo deste README é explicar como configurar e executar ambos os ambientes.

---

## 📂 Estrutura do Projeto
```
/projeto
  ├── backend/     # API em Node.js + TypeScript
  ├── frontend/    # Aplicação Angular
  └── README.md
```

---

## ⚙️ Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- [Node.js](https://nodejs.org/) (versão LTS recomendada)  
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)  
- [Angular CLI](https://angular.dev/tools/cli) (caso não tenha, instale com `npm install -g @angular/cli`)  

---

## 🚀 Backend (Node + TypeScript)

### 🔧 Instalação
```bash
cd backend
npm install
```

### ▶️ Executar em Desenvolvimento
```bash
npm run dev
```

---

## 🎨 Frontend (Angular)

### 🔧 Instalação
```bash
cd frontend
npm install
```
## 🔗 Integração Frontend + Backend

Por padrão:  
- **Backend** roda em: `http://localhost:3000`  
- **Frontend** roda em: `http://localhost:4200`  

---

## ✅ Scripts úteis

### Backend
- `npm run dev` → Rodar em modo desenvolvimento  
- `npm run test` → Roda os test unitários  

### Frontend
- `npm run start` → Rodar em desenvolvimento    

---

## 📝 Próximas Evoluções do Projeto

1. Aprimorar o visual do front-end: Adotar um estilo mais moderno, responsivo e fluido.
2. Criptografia de senhas: Garantir que as senhas sejam armazenadas de forma segura no banco de dados.
3. Containerização: Encapsular backend e frontend em containers, facilitando a implantação e integração com outros sistemas.
4. Conclusão de tarefas: Adicionar botão para concluir tasks e implementar a rota correspondente no backend.
5. Logout: Incluir botão de deslogar nas telas do sistema.
6. Recuperação de senha: Implementar funcionalidade para recuperação de senha.
7. Verificação de tasks concluídas: Adicionar botão para filtrar ou visualizar tasks já concluídas.
8. Customização de propriedades: Permitir que o usuário escolha ou configure propriedades adicionais das tasks.
9. Testes no front-end: Criar testes automatizados para garantir maior confiabilidade da interface.

## 📖 Documentação
- [Node.js](https://nodejs.org/)  
- [TypeScript](https://www.typescriptlang.org/)  
- [Angular](https://angular.dev/)  
