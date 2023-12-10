import * as sinon from 'sinon';
import * as chai from 'chai';
import * as jwt from 'jsonwebtoken';

// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import { tokenMock } from './mocks/TokenMock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Middleware Auth Tests', () => {
  let jwtVerifyStub: sinon.SinonStub;

  beforeEach(() => {
    jwtVerifyStub = sinon.stub(jwt, 'verify').callsFake(() => ({ email: 'email@mail' }));
  });

  afterEach(() => {
    jwtVerifyStub.restore();
  });

  it('Deve retornar 401 se nenhum token for fornecido', async () => {
    const res = await chai.request(app).get('/login/role');

    expect(res).to.have.status(401);
    expect(res.body).to.deep.equal({ message: 'Token not found' });
  });

  it('Deve retornar 401 para um token inválido', async () => {
    jwtVerifyStub.throws();

    const res = await chai.request(app).get('/login/role')
      .set('Authorization', 'Bearer invalidtoken');

    expect(res).to.have.status(401);
    expect(res.body).to.deep.equal({ message: 'Token must be a valid token' });
  });

  it('Deve permitir acesso para um token válido', async () => {
    const res = await chai.request(app).get('/login/role')
      .set('Authorization', `Bearer ${tokenMock}`);

    expect(res).to.have.status(200);
  });
});
