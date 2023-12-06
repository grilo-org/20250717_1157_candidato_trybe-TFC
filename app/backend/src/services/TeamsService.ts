import { ServiceResponse } from '../Interfaces/ServiceResponse';
import TeamsModel from '../models/TeamsModel';
import InterfaceTeam from '../Interfaces/Teams';

export default class TeamsService {
  constructor(
    private teamsModel: TeamsModel = new TeamsModel(),
  ) { }

  public async findAll(): Promise<ServiceResponse<InterfaceTeam[]>> {
    const allTeams = await this.teamsModel.findAll();
    return { status: 'SUCCESS', data: allTeams };
  }

  public async findById(id: number): Promise<ServiceResponse<InterfaceTeam | null>> {
    const team = await this.teamsModel.findById(id);
    if (!team) return { status: 'NOT_FOUND', data: { message: 'Team not found' } };
    return { status: 'SUCCESS', data: team };
  }

  async doesTeamExist(id: number): Promise<boolean> {
    const team = await this.teamsModel.findById(id);
    return team !== null;
  }
}
