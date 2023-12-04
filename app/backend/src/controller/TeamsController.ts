import { Request, Response } from 'express';
import mapStatus from '../utils/mapStatus';
import TeamsService from '../services/TeamsService';

export default class TeamsController {
  constructor(
    private teamsService = new TeamsService(),
  ) { }

  public async getAllTeams(_req: Request, res: Response) {
    const serviceResponse = await this.teamsService.findAll();
    return res.status(mapStatus(serviceResponse.status)).json(serviceResponse.data);
  }
}
