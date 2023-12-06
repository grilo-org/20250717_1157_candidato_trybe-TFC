import SequelizeTeam from '../database/models/SequelizeTeam';
import SequelizeMatches from '../database/models/SequelizeMatches';
import { InterfaceMatches } from '../Interfaces/Matches';

interface MatchWithTeams extends InterfaceMatches {
  homeTeam: { teamName: string }
  awayTeam: { teamName: string }
}

export default class MatchesModel {
  private model = SequelizeMatches;

  // Funções mapMatches e findAll dividas devido ao limite de 20 linhas por função

  private static mapMatchesData(matchesData: SequelizeMatches[]): MatchWithTeams[] {
    return matchesData.map((matche) => {
      const { id, homeTeamId, homeTeamGoals,
        awayTeamId, awayTeamGoals,
        inProgress, homeTeam, awayTeam } = matche as unknown as MatchWithTeams;
      return {
        id,
        homeTeamId,
        homeTeamGoals,
        awayTeamId,
        awayTeamGoals,
        inProgress,
        homeTeam: { teamName: homeTeam.teamName },
        awayTeam: { teamName: awayTeam.teamName },
      };
    });
  }

  async findAll(inProgress?:boolean): Promise<MatchWithTeams[]> {
    const whereCondition = inProgress !== undefined ? { inProgress } : {};
    const matchesData = await this.model.findAll({
      where: whereCondition,
      include: [
        {
          model: SequelizeTeam,
          as: 'homeTeam',
          attributes: ['teamName'],
        },
        {
          model: SequelizeTeam,
          as: 'awayTeam',
          attributes: ['teamName'],
        },
      ],
    });
    return MatchesModel.mapMatchesData(matchesData);
  }

  async finishMatch(id: number): Promise<void> {
    await this.model.update({ inProgress: false }, { where: { id } });
  }
}
