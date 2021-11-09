<h1 align="center">
  ## Edaily#Backend
</h1>

<blockquote align="center">“Ninguém joga pedra em árvore que não da fruto”!</blockquote>

<p align="center">
  <img alt="challenge" src="https://img.shields.io/badge/challenge-%2304D361">

  <a href="https://github.com/carvalhoviniciusluiz">
    <img alt="Made by Vinicius Carvalho" src="https://img.shields.io/badge/made%20by-Vinicius%20Carvalho-%2304D361">
  </a>

  <img alt="License" src="https://img.shields.io/badge/license-MIT-%2304D361">
</p>

<p align="center">
  <a href="#objetivo">Objetivo</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#rocket-sobre-o-projeto">Sobre o projeto</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#loop-test-api">Test API</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#memo-licença">Licença</a>
</p>

## Objetivo:

## Requisitos técnicos

- Desenvolver usando _Javascript_
- Serviço deve respeitar os princípios RESTFul
- Criar um `README.md` (arquitetura, instruções de uso, entre outros)

## Diferenciais

- Publicação do ambiente em um serviço cloud de hospedagens (Heroku, AWS, GCP, etc)
- Configurar a aplicação para rodar em um container
- Documentação da API

## :rocket: Sobre o projeto

### **Requisitos:**

- [NodeJs `>16.0.0`](https://nodejs.org/en/).

- [Docker Descktop](https://docs.docker.com/desktop/mac/install/)

- [Yarn](https://classic.yarnpkg.com/en/docs/install/#mac-stable)

### **As ferramentas que você irá encontrar**

Aplicação criada do zero usando [NestJs](https://nestjs.com/), conta com as seguintes ferramentas:

- Husky + Concurrently;
- ESLint + Prettier + EditorConfig;
- [TypeORM](https://typeorm.io/#/) [(PostgreSQL)](https://www.postgresql.org/);
- [Restful](https://www.redhat.com/pt-br/topics/api/what-is-a-rest-api);
- [Swagger](https://swagger.io/) + [Insomnia](https://insomnia.rest/);
- [Jest](https://jestjs.io/);
- Tests de TDD + e2e;
- Outros

**NOTA**: Todo o projeto está baseado na [arquitetura de modulos sugerida pelo Nestjs](https://docs.nestjs.com/modules)

### **Instalação:**

```
yarn
```

### Endpoint _Auth_

```bash
grant_type = refresh_token
  --> refresh_token

grant_type = password_grant
  --> credential
  --> password

grant_type = create_credentials
  --> firstname
  --> lastname
  --> documentNumber
  --> email
  --> phone
  --> password
```

### **Tests:**

```shell
yarn test && yarn test:e2e
```

### **Rodando o Projeto:**

Este projeto está conteinerizado em Docker, com exceção do nodejs, você não precisa ter instalado localmente o banco de dados integrado ao sistema.

Para subir o docker do projeto rode:

```bash
docker-compose up
```

**NOTA**: o projeto conta com todas as configurações realizadas a partir de variáveis ambiente. Você deve criar um arquivo `.env` a partir do `.env.sample` já existente no projeto.

## :loop: Test API

Este projeto possui sua api documentada com [swagger](https://swagger.io/) bastanto para tal acessar a rota [`http://localhost:3333/api/`](http://localhost:3333/api/)

## :memo: Licença

Esse projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
