Aqui está o README.md com a indentação ajustada:

```markdown
# API de Controle Financeiro

Este é um projeto de API para gerenciamento de transações financeiras, desenvolvido com Node.js, Express e MongoDB.

## Estrutura do Projeto
```
.env
.gitignore
controllers/
    authController.js
    transactionController.js
coverage/
    clover.xml
    coverage-final.json
    lcov-report/
        ...
    lcov.info
jest.config.js
middlewares/
    authMiddleware.js
    validateRequest.js
    validateUser.js
models/
    RefreshToken.js
    Transaction.js
    User.js
package.json
routes/
    authRoutes.js
    transactionRoutes.js
server.js
swagger.js
tests/
    auth.test.js
    loginAndGetToken.js
    setupTestDB.js
    transaction.test.js
validators/
    transactionValidator.js
    userValidator.js
```

## Instalação

1. Clone o repositório:
   ```sh
   git clone <URL_DO_REPOSITORIO>
   ```

2. Navegue até o diretório do projeto:
   ```sh
   cd backend
   ```

3. Instale as dependências:
   ```sh
   npm install
   ```

4. Crie um arquivo .env com as seguintes variáveis:
   ```sh
   JWT_SECRET=<sua_chave_secreta_jwt>
   REFRESH_SECRET=<sua_chave_secreta_refresh>
   NODE_ENV=development
   PORT=5000
   ```

## Uso

1. Inicie o servidor:
   ```sh
   npm start
   ```

2. Acesse a documentação da API no navegador:
   [http://localhost:5000/api-docs](http://localhost:5000/api-docs)

## Endpoints

### Autenticação
- `POST /auth/register`: Registra um novo usuário.
- `POST /auth/login`: Realiza login e retorna um token JWT.
- `POST /auth/refresh-token`: Gera um novo access token a partir do refresh token.
- `POST /auth/logout`: Faz logout removendo o refresh token.

### Transações
- `POST /transactions`: Cria uma nova transação.
- `GET /transactions`: Lista todas as transações do usuário.
- `GET /transactions/{id}`: Busca uma transação por ID.
- `PUT /transactions/{id}`: Atualiza uma transação por ID.
- `DELETE /transactions/{id}`: Deleta uma transação por ID.

## Testes

Para rodar os testes, execute:
   ```sh
   npm test
   ```

Se precisar de mais alguma coisa, estou à disposição!
