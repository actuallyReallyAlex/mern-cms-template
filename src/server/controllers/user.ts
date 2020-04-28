import express, { Router } from 'express';
import User from '../models/User';

class UserController {
  public router: Router = express.Router();

  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes(): void {
    this.router.post(
      '/user/login',
      async (req: express.Request, res: express.Response) => {
        try {
          const user = await User.findByCredentials(
            req.body.email,
            req.body.password,
          );

          res.send(user);
        } catch (e) {
          // eslint-disable-next-line no-console
          console.error(e);
          res.status(500).send();
        }
      },
    );
  }
}

export default UserController;
