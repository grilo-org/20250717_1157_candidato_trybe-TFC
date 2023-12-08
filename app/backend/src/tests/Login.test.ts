import * as chai from 'chai';
import * as jwt from 'jsonwebtoken';

// @ts-ignore
import chaiHttp = require('chai-http');

const { expect } = chai;
import { app } from '../app';

chai.use(chaiHttp);

describe('Testes do Login', () => {
  it('Deve autenticar um usuário e retornar um token JWT', async () => {
    const userCredentials = { email: 'admin@admin.com', password: 'secret_admin' };
    const response = await chai.request(app)
      .post('/login')
      .send(userCredentials);

    expect(response).to.have.status(200);
    expect(response.body).to.have.property('token');
  });

  it('Deve retornar um erro 401 ao tentar autenticar um usuário com credenciais inválidas', async () => {
    const userCredentials = { email: 'user@user.com', password: 'secret_use' };
    const response = await chai.request(app)
      .post('/login')
      .send(userCredentials);

    expect(response).to.have.status(401);
})

it('Retorna um erro caso o email não seja enviado', async () => {
  const userCredentials = { email: '', password: 'secret_admin' };
  const response = await chai.request(app)
    .post('/login')
    .send(userCredentials);

  expect(response).to.have.status(400);
  expect(response.body).to.be.deep.eq({ "message": "All fields must be filled"} );
})

it('Retorna um erro caso a senha não seja enviada', async () => {
  const userCredentials = { email: 'admin@admin.com', password: '' };
  const response = await chai.request(app)
    .post('/login')
    .send(userCredentials);

  expect(response).to.have.status(400);
  expect(response.body).to.be.deep.eq({ "message": "All fields must be filled"} );
})






});
