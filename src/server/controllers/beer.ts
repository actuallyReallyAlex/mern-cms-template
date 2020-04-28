import express, { Router } from 'express';
import Beer from '../models/Beer';

class BeerController {
  public router: Router = express.Router();

  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes(): void {
    this.router.get(
      '/beers',
      async (req: express.Request, res: express.Response) => {
        try {
          const beers = await Beer.find();

          res.send(beers);
        } catch (e) {
          // eslint-disable-next-line no-console
          console.error(e);
          res.status(500).send();
        }
      },

      this.router.post(
        '/beer',
        async (req: express.Request, res: express.Response) => {
          try {
            const newBeer = new Beer({
              abv: req.body.abv,
              brewer: req.body.brewer,
              description: req.body.description,
              name: req.body.name,
            });

            await newBeer.save();

            res.status(201).send(newBeer);
          } catch (e) {
            // eslint-disable-next-line no-console
            console.error(e);
            res.status(500).send();
          }
        },
      ),
    );
  }
}

export default BeerController;
