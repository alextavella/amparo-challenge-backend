# Amparo Challenge - Backend

Este projeto consiste em uma API desenvolvida em Node.js.

Instruções para execução da aplicação:

# Development

Por padrão a aplicação está rodando em http://localhost:3333

#### `yarn`
#### `yarn dev`

ou

#### `docker-compose up --build -d`


## Tests

#### `yarn`
#### `yarn test`


# Routes

### Activities

`GET /api/activities`

`POST /api/activities`

`PATCH /api/activities/:id`


### Patients

`GET /api/patients`

`POST /api/patients`

`GET /api/patients/search/?term={name|cpf}`
