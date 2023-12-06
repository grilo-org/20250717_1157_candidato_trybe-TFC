import MatchesModel from '../models/MatchesModel';
import { ServiceMessage, ServiceResponse } from '../Interfaces/ServiceResponse';
import { InterfaceMatches } from '../Interfaces/Matches';

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
}
