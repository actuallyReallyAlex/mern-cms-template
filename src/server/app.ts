import chalk from "chalk";
import cors from "cors";
import express, { Request, Response } from "express";
import morgan from "morgan";
import path from "path";

import { Controller } from "./types";
import mongoose from "mongoose";
import Beer from "./models/Beer";
import User from "./models/User";

class App {
  public app: express.Application;

  public port: number | string;

  constructor(controllers: Controller[], port: number | string) {
    this.app = express();
    this.port = port;

    this.initializeMiddlewares();
    this.initializeControllers(controllers);
    // this.setUpDatabase(); // TODO - Remove this
  }

  private async setUpDatabase(): Promise<void> {
    // const newUser = new User({
    //   email: "email@email.com",
    //   name: "TEST",
    //   password: "Red123",
    // });
    // await newUser.save();
    // const beers = [
    //   { name: "IPA " },
    //   { name: "Light Beer" },
    //   { name: "Amber Ale" },
    // ];
    // const beerPromises = [];

    // beers.forEach((beer) => {
    //   const newBeer = new Beer({ name: beer.name });
    //   beerPromises.push(newBeer.save());
    // });

    // await Promise.all(beerPromises);
  }

  private initializeMiddlewares(): void {
    mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });

    this.app.use(express.json());
    this.app.use(morgan("dev"));
    const whitelistDomains = [
      "http://localhost:3000",
      "http://localhost:8080",
      undefined,
    ];

    const corsOptions = {
      origin: (origin: string, cb: Function): void => {
        if (whitelistDomains.indexOf(origin) !== -1) {
          cb(null, true);
        } else {
          console.error(`Sever refused to allow: ${origin}`);
          cb(new Error("Not allowed by CORS"));
        }
      },
    };

    this.app.use(cors(corsOptions));
  }

  private initializeControllers(controllers: Controller[]): void {
    controllers.forEach((controller) => {
      this.app.use("/", controller.router);
    });

    this.app.use(express.static(path.join(__dirname, "../dist")));

    this.app.get("*", (req: Request, res: Response) => {
      res.sendFile(path.join(__dirname, "../dist/index.html"));
    });
  }

  public listen(): void {
    this.app.listen(this.port, () => {
      console.log(`Mode: ${chalk.yellowBright(process.env.NODE_ENV)}\n`);
      console.log(
        `Server is listening on port: ${chalk.yellowBright(this.port)}\n`
      );
    });
  }
}

export default App;
