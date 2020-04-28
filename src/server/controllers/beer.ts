import express, { Router } from "express";
import Beer from "../models/Beer";

class BeerController {
  public router: Router = express.Router();

  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes(): void {
    this.router.get(
      "/beers",
      async (req: express.Request, res: express.Response) => {
        try {
          const beers = await Beer.find();

          res.send(beers);
        } catch (e) {
          console.error(e);
          res.status(500).send();
        }
      }
    );
  }
}

export default BeerController;
