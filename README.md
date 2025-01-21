# Sistema de Gerenciamento de Tarefas CRUD App

Este é um aplicativo de gerenciamento de tarefas que permite aos usuários criar, editar, visualizar e excluir tarefas. O projeto é dividido em duas partes: o backend, que lida com a lógica do servidor e a comunicação com o banco de dados, e o frontend, que fornece a interface do usuário.

## Estrutura do Projeto
├── backend/ 
│       ├── controllers/ 
│       │       ├── sist_gerenciamento_tarefas.code-workspace 
│       │       └── tarefas.js 
│       ├── middleware/ 
│       │       └── authMiddleware.js
│       ├── models/
│       │       └── userAuth.js
│       ├── routes/ 
│       │       ├── authRoutes.js
│       │       └── protectedRoutes.js 
│       ├── db.js 
│       ├── index.js 
│       ├── parsebackend.js 
│       └── package.json 
├── public/ 
│       ├── index.html 
│       ├── manifest.json 
│       └── robots.txt 
├── src/ 
│   ├── components/ 
│   │       ├── confirmBox.js 
│   │       ├── create_button.js 
│   │       ├── create_tab.js 
│   │       ├── delete_button.js 
│   │       ├── edit_button.js 
│   │       ├── edit_tab.js 
│   │       ├── filterComponent.js 
│   │       ├── logout.js 
│   │       ├── navbar.js 
│   │       └── protectedRoute.js 
│   ├── functions/ 
│   │       ├── authProvider.js 
│   │       ├── deleteTask.js 
│   │       ├── handleCheckboxChange.js 
│   │       ├── openDelete.js 
│   │       ├── toggleEditTab.js 
│   │       └── toggleTab.js 
│   ├── paginas/ 
│   │       ├── cadastro.js 
│   │       ├── home.js 
│   │       ├── login.js 
│   │       ├── thismonth.js 
│   │       ├── thisweek.js 
│   │       └── today.js 
│   ├── App.css 
│   ├── App.js 
│   ├── App.test.js 
│   ├── index.css 
│   ├── index.js 
│   ├── reportWebVitals.js 
│   ├── Router.js 
│   └── setupTests.js 
├── .gitignore 
├── .gitmodules 
├── package.json 
├── README.md 
└── tailwind.config.js

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
*Autenticação de Usuário:
    *Registro de novos usuários
    *Login de usuários existentes
    *Logout

*Gerenciamento de Tarefas:
    *Criação de novas tarefas
    *Edição de tarefas existentes
    *Exclusão de tarefas
    *Visualização de tarefas por dia, semana e mês

### Rotas da API
*Autenticação:

    *POST /api/user/register - Registro de novo usuário
    *POST /api/user/login - Login de usuário
    *GET /api/user/logout - Logout de usuário

*Tarefas:
    *GET /api/tarefas - Listar todas as tarefas
    *POST /api/tarefas - Criar nova tarefa
    *PUT /api/tarefas/:id - Editar tarefa existente
    *PATCH /api/tarefas/:id - Atualizar status de conclusão da tarefa
    *DELETE /api/tarefas/:id - Excluir tarefa
    *GET /api/tarefas/hoje - Listar tarefas de hoje
    *GET /api/tarefas/semana - Listar tarefas da semana
    *GET /api/tarefas/mes - Listar tarefas do mês


### Contribuição
Faça um fork do projeto.
Crie uma branch para sua feature (git checkout -b feature/nova-feature).
Commit suas mudanças (git commit -am 'Adiciona nova feature').
Faça um push para a branch (git push origin feature/nova-feature).
Abra um Pull Request.




Este `README.md` fornece uma visão geral do projeto, incluindo a estrutura do projeto, tecnologias utilizadas, configuração do ambiente, funcionalidades, rotas da API, e instruções para contribuição.