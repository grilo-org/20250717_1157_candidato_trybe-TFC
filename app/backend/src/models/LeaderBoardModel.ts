import InterfaceLeaderBoard from '../Interfaces/LeaderBoard';
import MatchesModel from './MatchesModel';

export default class LeaderBoard {
  private matches = new MatchesModel();

  constructor() {
    this.matches = new MatchesModel();
  }

  async getHomeTeams(): Promise<InterfaceLeaderBoard[]> {
    const matches = await this.matches.findAll();
    return matches.map((match) => {
      const { homeTeam } = match;
      return {
        name: homeTeam.teamName,
        totalPoints: 0,
        totalGames: 0,
        totalVictories: 0,
        totalDraws: 0,
        totalLosses: 0,
        goalsFavor: 0,
        goalsOwn: 0,
        goalsBalance: 0,
      };
    });
  }
}
