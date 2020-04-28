import App from "./app";
import BeerController from "./controllers/beer";
import UserController from "./controllers/user";

const app = new App(
  [new BeerController(), new UserController()],
  process.env.PORT
);

app.listen();
