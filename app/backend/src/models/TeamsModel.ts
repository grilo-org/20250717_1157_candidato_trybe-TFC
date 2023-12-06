// import { ICRUDModel } from '../Interfaces/CRUD';
import InterfaceTeam from '../Interfaces/Teams';
import SequelizeTeam from '../database/models/SequelizeTeam';

export default class TeamsModel {
  private model = SequelizeTeam;
  static model: SequelizeTeam;

  async findAll(): Promise<InterfaceTeam[]> {
    const teamsData = await this.model.findAll();
    return teamsData.map((team) => {
      const { id, teamName } = team;
      return { id, teamName };
    });
  }

  async findById(id: number): Promise<InterfaceTeam | null> {
    const teamData = await this.model.findByPk(id);
    if (!teamData) return null;
    const { teamName } = teamData;
    return { id, teamName };
  }
}
