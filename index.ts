import express from "express";
import cors from "cors";
import { productRouter } from "./src/controllers/product.controller";
import { cartRouter } from "./src/controllers/cart.controller";
import { authenticate } from "./src/middlewares/authentication";
import { errorHandler } from "./src/middlewares/errorHandler";

const app = express();
const port = process.env.PORT;
const mainRoute = process.env.MAIN_ROUTE;

app.use(express.json());
app.use(cors());
app.use(mainRoute, authenticate);

app.use(mainRoute + '/products', productRouter);
app.use(mainRoute + '/profile/cart', cartRouter);

app.use(mainRoute, errorHandler);

app.listen(port, () => {
    console.log('Server listening on port ' + port);
})