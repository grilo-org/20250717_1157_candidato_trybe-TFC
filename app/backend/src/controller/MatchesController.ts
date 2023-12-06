import { Request, Response } from 'express';
import mapStatus from '../utils/mapStatus';
import MatchesService from '../services/MatchesService';

export default class MatchesController {
  constructor(
    private matchesService = new MatchesService(),
  ) { }

  public async getAllMatches(_req: Request, res: Response, inProgress?: boolean) {
    const serviceResponse = await this.matchesService.findAll(inProgress);
    return res.status(mapStatus(serviceResponse.status)).json(serviceResponse.data);
  }

  public async finishMatch(req: Request, res: Response) {
    const { id } = req.params;
    const serviceResponse = await this.matchesService.finishMatch(Number(id));
    return res.status(mapStatus(serviceResponse.status)).json(serviceResponse.data);
  }

  // public async getTeamById(req: Request, res: Response) {
  //   const { id } = req.params;
  //   const serviceResponse = await this.teamsService.findById(Number(id));
  //   return res.status(mapStatus(serviceResponse.status)).json(serviceResponse.data);
  // }
}
