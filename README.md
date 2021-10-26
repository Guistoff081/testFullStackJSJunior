# testFullStackJSJunior

<h5>Teste para dev fullstack da Contele Labs</h5>

<h1>Documentation<h1>

* Uma API nodejs com express que realiza operações de crud de ``Usuários``

<br>

<h2>Introduction</h2>

* Essa Aplicação consiste em uma API RESTful. 
* Cada endpoint é responsável por realizar uma das ações do CRUD no Model ``Users``.
* * GET /api/v1/users
* * POST /api/v1/users
* * PUT /api/v1/users/:id
* * GET /api/v1/users/:id
* * DELETE /api/v1/users
* * DELETE /api/v1/users/:id

<h2>Getting Started</h2>

* Run ``npm i`` dentro da pasta clonada do projeto
* Crie um novo banco com o comando ``createdb mydatabase``
* Executar as migrations com o comando: ``npx knex migration:latest``
* Executar comando para popular a tabela: ``npx knex seed:run`` (opcional)
* Por fim executar o comando ``npm start``

<h2></h2>

<h2>System dependencies</h2>

* Postgresql
* Knex Query Builder
* ExpressJS
* Swagger UI
* Docker-Compose
