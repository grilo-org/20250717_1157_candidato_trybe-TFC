import MatchesModel from '../models/MatchesModel';
import { ServiceMessage, ServiceResponse } from '../Interfaces/ServiceResponse';
import { InterfaceMatches, InterfaceNewMatch } from '../Interfaces/Matches';
import TeamsService from './TeamsService';

export default class MatchesService {
  constructor(
    private matchesModel: MatchesModel = new MatchesModel(),
  ) { }

  public async findAll(inProgress?: boolean): Promise<ServiceResponse<InterfaceMatches[]>> {
    const allMatches = await this.matchesModel.findAll(inProgress);
    return { status: 'SUCCESS', data: allMatches };
  }

  public async finishMatch(id: number): Promise<ServiceResponse<ServiceMessage>> {
    await this.matchesModel.finishMatch(id);
    return { status: 'SUCCESS', data: { message: 'Finished' } };
  }

  public async updateMatch(id: number, homeTeamGoals: number, awayTeamGoals: number)
    : Promise<ServiceResponse<ServiceMessage>> {
    await this.matchesModel.updateMatch(id, homeTeamGoals, awayTeamGoals);

    if (!homeTeamGoals || !awayTeamGoals) {
      return { status: 'INVALID_DATA', data: { message: 'Missing parameters' } };
    }
    return { status: 'SUCCESS', data: { message: 'Match updated!' } };
  }

  // Funções divididas devido ao limite de 20 linhas por função
  private static async verifyTeamsExistence(homeTeamId: number, awayTeamId: number) {
    const teamService = new TeamsService();
    const homeTeam = await teamService.doesTeamExist(homeTeamId);
    const awayTeam = await teamService.doesTeamExist(awayTeamId);
    if (!homeTeam || !awayTeam) return false;
    return true;
  }

  private async newMatch(
    homeTeamId: number,
    awayTeamId: number,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ): Promise<InterfaceNewMatch> {
    const newMatch = await this.matchesModel.createMatch(
      homeTeamId,
      awayTeamId,
      homeTeamGoals,
      awayTeamGoals,
    );
    return newMatch;
  }

  public async createMatch(
    homeTeamId: number,
    awayTeamId: number,
    homeTeamGoals: number,
    awayTeamGoals: number,
  )
    : Promise<ServiceResponse<InterfaceNewMatch>> {
    if (homeTeamId === awayTeamId) {
      return { status: 'UNPROCESSABLE_ENTITY',
        data: { message: 'It is not possible to create a match with two equal teams' } };
    }

    const teamExist = await MatchesService.verifyTeamsExistence(homeTeamId, awayTeamId);
    if (!teamExist) {
      return { status: 'NOT_FOUND', data: { message: 'There is no team with such id!' } };
    }

    const newMatch = await this.newMatch(homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals);
    return { status: 'CREATED', data: newMatch };
  }
}
