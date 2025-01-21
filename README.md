# Sistema de Gerenciamento de Tarefas CRUD App

Este é um aplicativo de gerenciamento de tarefas que permite aos usuários criar, editar, visualizar e excluir tarefas. O projeto é dividido em duas partes: o backend, que lida com a lógica do servidor e a comunicação com o banco de dados, e o frontend, que fornece a interface do usuário.

## Estrutura do Projeto
├── backend/ <br>
│       ├── controllers/ 
│       │       ├── sist_gerenciamento_tarefas.code-workspace <br>
│       │       └── tarefas.js <br>
│       ├── middleware/ <br>
│       │       └── authMiddleware.js<br>
│       ├── models/<br>
│       │       └── userAuth.js<br>
│       ├── routes/ <br>
│       │       ├── authRoutes.js<br>
│       │       └── protectedRoutes.js <br>
│       ├── db.js <br>
│       ├── index.js <br>
│       ├── parsebackend.js <br>
│       └── package.json <br>
├── public/ <br>
│       ├── index.html <br>
│       ├── manifest.json <br>
│       └── robots.txt <br>
├── src/ <br>
│   ├── components/ <br>
│   │       ├── confirmBox.js <br>
│   │       ├── create_button.js <br>
│   │       ├── create_tab.js <br>
│   │       ├── delete_button.js <br>
│   │       ├── edit_button.js <br>
│   │       ├── edit_tab.js <br>
│   │       ├── filterComponent.js <br>
│   │       ├── logout.js <br>
│   │       ├── navbar.js <br>
│   │       └── protectedRoute.js <br>
│   ├── functions/ <br>
│   │       ├── authProvider.js <br>
│   │       ├── deleteTask.js <br>
│   │       ├── handleCheckboxChange.js <br>
│   │       ├── openDelete.js <br>
│   │       ├── toggleEditTab.js <br>
│   │       └── toggleTab.js <br>
│   ├── paginas/ <br>
│   │       ├── cadastro.js <br>
│   │       ├── home.js <br>
│   │       ├── login.js <br>
│   │       ├── thismonth.js <br>
│   │       ├── thisweek.js <br>
│   │       └── today.js <br>
│   ├── App.css <br>
│   ├── App.js <br>
│   ├── App.test.js <br>
│   ├── index.css <br>
│   ├── index.js <br>
│   ├── reportWebVitals.js <br>
│   ├── Router.js <br>
│   └── setupTests.js <br>
├── .gitignore <br>
├── .gitmodules <br>
├── package.json <br>
├── README.md <br>
└── tailwind.config.js<br>

## Tecnologias Utilizadas

- **Backend:**
  - Node.js
  - Express
  - PostgreSQL
  - Sequelize
  - JWT (JSON Web Token)
  - bcrypt

- **Frontend:**
  - React
  - Axios
  - Tailwind CSS
  - React Router

## Configuração do Ambiente

### Backend

1. Navegue até o diretório `backend`:
   ```cd backend```

2. Instale as dependências:
```npm install```

3.Configure o banco de dados PostgreSQL e atualize o arquivo .env com as credenciais corretas:
```CONNECTION_STRING=postgres://usuario:senha@localhost:5432/tasks```

4. Inicie o servidor:
```npm start```

### Frontend
1.Navegue até o diretório raiz do projeto.
``cd ..``

2. Instale as dependências:
```npm install```

3. Inicie o servidor de desenvolvimento:
```npm start```

### Funcionalidades:
*Autenticação de Usuário:<br>
    *Registro de novos usuários <br>
    *Login de usuários existentes<br>
    *Logout<br>

*Gerenciamento de Tarefas:<br>
    *Criação de novas tarefas<br>
    *Edição de tarefas existentes<br>
    *Exclusão de tarefas<br>
    *Visualização de tarefas por dia, semana e mês<br>

### Rotas da API
*Autenticação:<br>

    *POST /api/user/register - Registro de novo usuário <br>
    *POST /api/user/login - Login de usuário<br>
    *GET /api/user/logout - Logout de usuário<br>

*Tarefas:<br>
    *GET /api/tarefas - Listar todas as tarefas<br>
    *POST /api/tarefas - Criar nova tarefa<br>
    *PUT /api/tarefas/:id - Editar tarefa existente<br>
    *PATCH /api/tarefas/:id - Atualizar status de conclusão da tarefa<br>
    *DELETE /api/tarefas/:id - Excluir tarefa<br>
    *GET /api/tarefas/hoje - Listar tarefas de hoje<br>
    *GET /api/tarefas/semana - Listar tarefas da semana<br>
    *GET /api/tarefas/mes - Listar tarefas do mês<br>


### Contribuição
Faça um fork do projeto.<br>
Crie uma branch para sua feature (git checkout -b feature/nova-feature).<br>
Commit suas mudanças (git commit -am 'Adiciona nova feature').<br>
Faça um push para a branch (git push origin feature/nova-feature).<br>
Abra um Pull Request.<br>




Este `README.md` fornece uma visão geral do projeto, incluindo a estrutura do projeto, tecnologias utilizadas, configuração do ambiente, funcionalidades, rotas da API, e instruções para contribuição.