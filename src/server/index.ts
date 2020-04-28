import App from "./app";
import BeerController from "./controllers/beer";

const app = new App([new BeerController()], process.env.PORT);

app.listen();
