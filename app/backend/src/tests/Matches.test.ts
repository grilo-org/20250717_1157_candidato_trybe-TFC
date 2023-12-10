import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import {mockedMatchesResult} from './mocks/SequelizeMatchesMock';

import { Response } from 'superagent';
import SequelizeMatches from '../database/models/SequelizeMatches';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes do Matches', () => {

  let chaiHttpResponse: Response;

  beforeEach(async () => {
    sinon
      .stub(SequelizeMatches, "findOne")
      .resolves({
        ...mockedMatchesResult[0],
      } as unknown as SequelizeMatches);
  });

  afterEach(()=>{
    (SequelizeMatches.findOne as sinon.SinonStub).restore();
  })

  it('Verifica o retorno do endpoint /matches', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .get('/matches');

    expect(chaiHttpResponse.status).to.be.eq(200);
    expect(chaiHttpResponse.body).to.be.deep.eq(mockedMatchesResult);
  });
});