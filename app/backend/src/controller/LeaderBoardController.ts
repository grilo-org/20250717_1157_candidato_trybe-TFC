import { Request, Response } from 'express';
import mapStatus from '../utils/mapStatus';
import LeaderBoardService from '../services/LeaderBoardService';

export default class LeaderBoardController {
  constructor(
    private leaderBoardService = new LeaderBoardService(),
  ) { }

  public async getHomeTeams(req: Request, res: Response) {
    const serviceResponse = await this.leaderBoardService.getHomeTeams();
    return res.status(mapStatus(serviceResponse.status)).json(serviceResponse.data);
  }
}
