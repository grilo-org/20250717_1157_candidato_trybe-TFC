import { Request, Router, Response } from 'express';
import MatchesController from '../controller/MatchesController';
import auth from '../middlewares/loginValidate';

const matchesController = new MatchesController();

const router = Router();

router.get('/', (req: Request, res: Response) => {
  const { inProgress } = req.query;

  let inProgressBoolean;
  if (inProgress === 'true') {
    inProgressBoolean = true;
  } else if (inProgress === 'false') {
    inProgressBoolean = false;
  }
  matchesController.getAllMatches(req, res, inProgressBoolean);
});

router.patch('/:id', auth, (req: Request, res: Response) => {
  matchesController.updateMatch(req, res);
});

router.patch('/:id/finish', auth, (req: Request, res: Response) => {
  matchesController.finishMatch(req, res);
});

router.post('/', auth, (req: Request, res: Response) => {
  matchesController.createMatch(req, res);
});

export default router;
