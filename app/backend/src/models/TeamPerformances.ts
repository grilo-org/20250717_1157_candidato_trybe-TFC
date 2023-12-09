import { InterfaceMatches } from '../Interfaces/Matches';

export default class TeamPerformances {
  private matches: InterfaceMatches[];

  constructor(matches: InterfaceMatches[]) {
    this.matches = matches;
  }

  getVictories(home: boolean): number {
    return this.matches.filter((match) =>
      (home ? match.homeTeamGoals
        > match.awayTeamGoals : match.awayTeamGoals > match.homeTeamGoals)).length;
  }

  getDraws() {
    return this.matches.filter((match) => match.homeTeamGoals === match.awayTeamGoals).length;
  }

  getLosses(home: boolean): number {
    return this.matches.filter((match) =>
      (home ? match.homeTeamGoals
      < match.awayTeamGoals : match.awayTeamGoals < match.homeTeamGoals)).length;
  }

  getGoals(home: boolean): number {
    return this.matches.reduce((sum, match) =>
      sum + (home ? match.homeTeamGoals : match.awayTeamGoals), 0);
  }

  getGoalsAgainst(home: boolean): number {
    return this.matches.reduce((sum, match) =>
      sum + (home ? match.awayTeamGoals : match.homeTeamGoals), 0);
  }

  getGoalsBalance(home: boolean): number {
    return this.getGoals(home) - this.getGoalsAgainst(home);
  }

  getEfficiency(home: boolean): number {
    const totalPoints = this.calculatePoints(home);
    const totalGames = this.getLosses(home) + this.getVictories(home) + this.getDraws();

    if (totalGames === 0) return 0.00;

    const efficiency = (totalPoints / (totalGames * 3)) * 100;
    return Number(efficiency.toFixed(2));
  }

  calculatePoints(home: boolean): number {
    const victories = this.getVictories(home);
    const draws = this.getDraws();
    return (victories * 3) + draws;
  }
}
