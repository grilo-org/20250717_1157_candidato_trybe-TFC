import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import SequelizeTeam from '../database/models/SequelizeTeam';
import {mockedTeamResult} from './mocks/SequelizeTeamMock';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes do Teams', () => {

  let chaiHttpResponse: Response;

  beforeEach(async () => {
    sinon
      .stub(SequelizeTeam, "findOne")
      .resolves({
        ...mockedTeamResult[0],
      } as SequelizeTeam);
  });

  afterEach(()=>{
    (SequelizeTeam.findOne as sinon.SinonStub).restore();
  })

  it('Verifica o retorno do endpoint /teams', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .get('/teams');

    expect(chaiHttpResponse.status).to.be.eq(200);
    expect(chaiHttpResponse.body).to.be.deep.eq(mockedTeamResult);
  });

  it('Verifica o retorno do endpoint /teams/:id', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .get('/teams/1');

    expect(chaiHttpResponse.status).to.be.eq(200);
    expect(chaiHttpResponse.body).to.be.deep.eq(mockedTeamResult[0]);
  }
  );
});
