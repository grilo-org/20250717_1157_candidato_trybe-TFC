import { Request, Response } from 'express';
import mapStatus from '../utils/mapStatus';
import LeaderBoardService from '../services/LeaderBoardService';

export default class LeaderBoardController {
  constructor(
    private leaderBoardService = new LeaderBoardService(),
  ) { }

  public async getHomeTeams(_req: Request, res: Response) {
    const serviceResponse = await this.leaderBoardService.getHomeTeams(true);
    return res.status(mapStatus(serviceResponse.status)).json(serviceResponse.data);
  }

  public async getAwayTeams(_req: Request, res: Response) {
    const serviceResponse = await this.leaderBoardService.getHomeTeams(false);
    return res.status(mapStatus(serviceResponse.status)).json(serviceResponse.data);
  }
}
