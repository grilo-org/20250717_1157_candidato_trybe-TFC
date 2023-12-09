import { Request, Router, Response } from 'express';
import LeaderBoardController from '../controller/LeaderBoardController';

const router = Router();

const leaderBoard = new LeaderBoardController();

router.get('/home', (req: Request, res: Response) => leaderBoard.getHomeTeams(req, res));

router.get('/away', (req: Request, res: Response) => leaderBoard.getAwayTeams(req, res));

export default router;
