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

  private static sortTeams = (a: InterfaceLeaderBoard, b: InterfaceLeaderBoard) =>
    b.totalPoints - a.totalPoints
      || b.totalVictories - a.totalVictories
      || b.goalsBalance - a.goalsBalance
      || b.goalsFavor - a.goalsFavor;

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

  async getLeaderBoards(home: boolean): Promise<InterfaceLeaderBoard[]> {
    const teams = await this.teams.findAll();
    const matches = await this.matches.findAll();
    return teams.map((team) => {
      const finishedMatches = matches
        .filter((match) => (home
          ? match.homeTeamId === team.id : match.awayTeamId === team.id)
          && match.inProgress === false);
      const performances = new TeamPerformance(finishedMatches);
      return LeaderBoard.createTeamStats(team, performances, home);
    }).sort(LeaderBoard.sortTeams);
  }

  private static createAllTeamsStats(
    homePerformance: TeamPerformance,
    awayPerformance: TeamPerformance,
  ): InterfaceLeaderBoard {
    const totalPoints = homePerformance.calculatePoints(true)
    + awayPerformance.calculatePoints(false);
    const totalGames = homePerformance.getTotalGames(true) + awayPerformance.getTotalGames(false);

    const totalPerformance = {
      totalPoints,
      totalGames,
      totalVictories: homePerformance.getVictories(true) + awayPerformance.getVictories(false),
      totalDraws: homePerformance.getDraws() + awayPerformance.getDraws(),
      totalLosses: homePerformance.getLosses(true) + awayPerformance.getLosses(false),
      goalsFavor: homePerformance.getGoals(true) + awayPerformance.getGoals(false),
      goalsOwn: homePerformance.getGoalsAgainst(true) + awayPerformance.getGoalsAgainst(false),
      goalsBalance: homePerformance.getGoalsBalance(true) + awayPerformance.getGoalsBalance(false),
      efficiency: parseFloat(((totalPoints / (totalGames * 3)) * 100).toFixed(2)),
    };

    return totalPerformance;
  }

  async getGeneralLeaderBoard(): Promise<InterfaceLeaderBoard[]> {
    const teams = await this.teams.findAll();
    const matches = await this.matches.findAll();

    return teams.map((team) => {
      const homeMatches = matches.filter((match) => match.homeTeamId === team.id
      && !match.inProgress);
      const awayMatches = matches.filter((match) => match.awayTeamId === team.id
      && !match.inProgress);

      const homePerformance = new TeamPerformance(homeMatches);
      const awayPerformance = new TeamPerformance(awayMatches);

      const totalPerformance = LeaderBoard.createAllTeamsStats(homePerformance, awayPerformance);
      return {
        name: team.teamName,
        ...totalPerformance,
      };
    }).sort(LeaderBoard.sortTeams);
  }
}
