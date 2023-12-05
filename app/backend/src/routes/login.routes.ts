import { Request, Router, Response } from 'express';
import LoginController from '../controller/LoginController';
import auth from '../middlewares/loginValidate';

const loginController = new LoginController();

const router = Router();

router.post('/', (req: Request, res: Response) => loginController.login(req, res));

router.get('/role', auth, (req: Request, res: Response) => loginController.role(req, res));

export default router;
