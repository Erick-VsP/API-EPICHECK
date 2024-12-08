# API-EPICHECK

API para gestão de Equipamentos de Proteção Individual (EPI).

## Requisitos
- Node.js
- MySQL

## Instalação
1. Clone o repositório:
- git clone https://github.com/Erick-VsP/API-EPICHECK.git
- cd API-EPICHECK

## Instale as dependências:
- npm install

## Configure o banco de dados no arquivo .env
- DB_NAME = epi_database
- DB_USER = root
- DB_PASS = sua senha
- DB_HOST = localhost
- JWT_SECRET = sua chave secreta aqui

## Crie as tabelas no MySQL:
CREATE DATABASE epi_database;

USE epi_database;

CREATE TABLE epis (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(255),
  tipo VARCHAR(255),
  ca VARCHAR(255),
  tamanho VARCHAR(50),
  marca VARCHAR(50)
);

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) UNIQUE,
  password VARCHAR(255)
);

## Inicie a aplicação:
- node app.js

## Acesse a documentação da API:
- http://localhost:3000/docs

## Endpoints:
- POST /auth/register: Registrar um novo usuário;
- POST /auth/login: Login do usuário;
- GET /epicheck/epis: Listar todos os EPIs;
- GET /epicheck/epis/:id: Consultar um EPI específico;
- POST /epicheck/epis: Criar um novo EPI;
- PUT /epicheck/epis/:id: Atualizar um EPI;
- DELETE /epicheck/epis/:id: Deletar um EPI;


  
