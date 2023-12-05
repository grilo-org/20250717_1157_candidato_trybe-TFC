import { Request, Response } from 'express';
import mapStatus from '../utils/mapStatus';
import LoginService from '../services/LoginService';

export default class LoginController {
  constructor(
    private loginService = new LoginService(),
  ) { }

  public async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const serviceResponse = await this.loginService.Login({ email, password });
    return res.status(mapStatus(serviceResponse.status)).json(serviceResponse.data);
  }

  public async role(req: Request, res: Response) {
    const { email } = req.body;
    const serviceResponse = await this.loginService.Role(email);
    return res.status(mapStatus(serviceResponse.status)).json(serviceResponse.data);
  }
}
