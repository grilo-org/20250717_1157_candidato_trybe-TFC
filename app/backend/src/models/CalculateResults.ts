import { InterfaceMatches } from '../Interfaces/Matches';

export default class CalculateResults {
  private matches: InterfaceMatches[];

  constructor(matches: InterfaceMatches[]) {
    this.matches = matches;
  }
}
