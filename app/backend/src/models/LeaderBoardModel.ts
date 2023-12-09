import InterfaceTeam from '../Interfaces/Teams';
import InterfaceLeaderBoard from '../Interfaces/LeaderBoard';
import TeamPerformance from './TeamPerformances';
import MatchesModel from './MatchesModel';
import TeamsModel from './TeamsModel';

export default class LeaderBoard {
  private matches = new MatchesModel();
  private teams = new TeamsModel();

  constructor() {
    this.matches = new MatchesModel();
    this.teams = new TeamsModel();
  }

  private static createTeamStats(
    team: InterfaceTeam,
    performances: TeamPerformance,
    home: boolean,
  ): InterfaceLeaderBoard {
    return {
      name: team.teamName,
      totalPoints: performances.calculatePoints(home),
      totalGames: performances.getVictories(home)
      + performances.getDraws() + performances.getLosses(home),
      totalVictories: performances.getVictories(home),
      totalDraws: performances.getDraws(),
      totalLosses: performances.getLosses(home),
      goalsFavor: performances.getGoals(home),
      goalsOwn: performances.getGoalsAgainst(home),
      goalsBalance: performances.getGoalsBalance(home),
      efficiency: performances.getEfficiency(home),
    };
  }

  async getHomeTeams(home: boolean): Promise<InterfaceLeaderBoard[]> {
    const teams = await this.teams.findAll();
    const matches = await this.matches.findAll();
    return teams.map((team) => {
      const finishedMatches = matches
        .filter((match) => (home
          ? match.homeTeamId === team.id : match.awayTeamId === team.id)
          && match.inProgress === false);
      const performances = new TeamPerformance(finishedMatches);
      return LeaderBoard.createTeamStats(team, performances, home);
    }).sort((a, b) =>
      b.totalPoints - a.totalPoints
    || b.totalVictories - a.totalVictories
    || b.goalsBalance - a.goalsBalance
    || b.goalsFavor - a.goalsFavor);
  }
}
