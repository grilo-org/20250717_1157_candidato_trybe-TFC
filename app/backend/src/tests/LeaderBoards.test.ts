import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import SequelizeTeam from '../database/models/SequelizeTeam';

import { Response } from 'superagent';
import LeaderBoard from '../models/LeaderBoardModel';
import { allTeamsLeaderboard, awayTeamsLeaderboard, homeTeamsLeaderboard } from './mocks/LeaderBoardsMock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes do Leaderboards', () => {
  
  let chaiHttpResponse: Response;
  const leaderboard = new LeaderBoard();

  beforeEach(async () => {
    sinon
      .stub(leaderboard, 'getGeneralLeaderBoard') // Verifique se este é o nome correto do método
      .resolves(allTeamsLeaderboard as any);
  });

  afterEach(() => {
    (leaderboard.getGeneralLeaderBoard as sinon.SinonStub).restore(); // Restaura o stub correto
  });

  it('Verifica o retorno do endpoint /leaderboards', async () => {
    chaiHttpResponse = await chai.request(app).get('/leaderboard');
    expect(chaiHttpResponse).to.have.status(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(allTeamsLeaderboard);
  });

  it('Verifica o retorno do endpoint /leaderboard/home', async () => {
    chaiHttpResponse = await chai.request(app).get('/leaderboard/home');
    expect(chaiHttpResponse).to.have.status(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(homeTeamsLeaderboard);
  });

  it('Verifica o retorno do endpoint /leaderboard/away', async () => {
    chaiHttpResponse = await chai.request(app).get('/leaderboard/away');
    expect(chaiHttpResponse).to.have.status(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(awayTeamsLeaderboard);
  });
  


});
