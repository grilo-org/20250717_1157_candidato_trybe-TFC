import MatchesModel from '../models/MatchesModel';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import { InterfaceMatches } from '../Interfaces/Matches';

export default class MatchesService {
  constructor(
    private matchesModel: MatchesModel = new MatchesModel(),
  ) { }

  public async findAll(inProgress?: boolean): Promise<ServiceResponse<InterfaceMatches[]>> {
    const allMatches = await this.matchesModel.findAll(inProgress);
    return { status: 'SUCCESS', data: allMatches };
  }

  // public async findById(id: number): Promise<ServiceResponse<InterfaceTeam | null>> {
  //   const team = await this.matchesModel.findById(id);
  //   if (!team) return { status: 'NOT_FOUND', data: { message: 'Team not found' } };
  //   return { status: 'SUCCESS', data: team };
  // }
}
