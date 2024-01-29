import express from "express";
import cors from "cors";
import { authenticate } from "./src/middlewares/authentication";
import { errorHandler } from "./src/middlewares/errorHandler";
import cartRouter from "./src/routes/cart.router";
import productRouter from "./src/routes/product.router";
import mainRouter from "./src/routes/main.router";

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors());
app.use('/api', mainRouter);
mainRouter.use(authenticate);

mainRouter.use('/products', productRouter);
mainRouter.use('/profile/cart', cartRouter);

mainRouter.use(errorHandler);

app.listen(port, () => {
    console.log('Server listening on port ' + port);
});
