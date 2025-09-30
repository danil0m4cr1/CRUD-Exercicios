# Backend — API CRUD de Usuários (Node/Express + MongoDB)

## Requisitos
- Node.js 18+
- MongoDB instalado localmente (Compass é apenas o cliente; o serviço do Mongo precisa estar rodando)

## Instalação
cd backend
npm install
npm run dev

A API sobe em `http://localhost:3000`.
Edite `.env` se quiser mudar a porta ou o banco:
MONGODB_URI=mongodb://127.0.0.1:27017/usuariosdb
PORT=3000


## Rotas
- `GET /api/health` — status
- `GET /api/users` — lista usuários
- `GET /api/users/:id` — obtém um usuário
- `POST /api/users` — cria (JSON: { name, email, role? })
- `PUT /api/users/:id` — atualiza
- `DELETE /api/users/:id` — remove

## Dica Compass
Abra o MongoDB Compass e conecte usando a mesma URI para visualizar/editar dados.

backend/
 ├── src/
 │   ├── config/          → conexões e configurações externas
 │   │    ├── database.js     (MongoDB)
 │   │    └── gmail.js        (configuração da API do Gmail, por exemplo)
 │   │
 │   ├── model/           → modelos do banco de dados
 │   │    ├── User.js
 │   │    └── Maquina.js
 │   │
 │   ├── router/          → rotas de cada recurso/serviço
 │   │    ├── userRouter.js      (CRUD usuário)
 │   │    ├── maquinaRouter.js   (CRUD máquina)
 │   │    └── gmailRouter.js     (rotas da API do Gmail)
 │   │
 │   └── server.js        → inicia servidor e conecta todas as rotas
 │
 └── package.json

-Onde colocar cada coisa
config/ → tudo que for conexão externa (MongoDB, Gmail API, autenticação, etc.).
model/ → tudo que for coleção/tabela do banco (usuários, máquinas, produtos).
router/ → tudo que for rota da API.
CRUD de usuários → userRouter.js
CRUD de máquinas → maquinaRouter.js
Gmail → gmailRouter.js

No server.js você conecta cada rota:
            /api/users → vai para userRouter.js
            /api/maquinas → vai para maquinaRouter.js
            /api/gmail → vai para gmailRouter.js

Assim, cada API nova (CRUD ou serviço externo) vira um novo arquivo dentro de router/.
Se precisar de banco, também cria um novo arquivo em model/.
Se precisar de configuração externa, cria em config/

Explicando cada parte

config/
database.js → guarda a configuração do MongoDB.
gmail.js → guarda a autenticação e chave da API do Gmail.

model/
User.js → descreve como os usuários são salvos no banco.
Maquina.js → descreve como as máquinas são salvas no banco.
(Obs.: Gmail não precisa de model, porque não usa banco, ele já é um serviço externo.)

router/
userRouter.js → define os caminhos /api/users.
maquinaRouter.js → define os caminhos /api/maquinas.
gmailRouter.js → define os caminhos /api/gmail (ex.: /send, /inbox).

server.js
Junta tudo e conecta cada rota na sua URL principal:
    /api/users → usuários
    /api/maquinas → máquinas
    /api/gmail → Gmail

 Resumindo
Se for um CRUD com banco → cria model/ e router/.
Se for uma API externa (como Gmail) → cria config/ e router/.