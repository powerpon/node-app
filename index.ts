import express from "express";
import cors from "cors";
import { authenticate } from "./src/middlewares/authentication";
import { errorHandler } from "./src/middlewares/errorHandler";
import cartRouter from "./src/routes/cart.router";
import productRouter from "./src/routes/product.router";
import mainRouter from "./src/routes/main.router";
import { connect } from "mongoose";
import { asyncHandler } from "./src/helpers/asyncHandler";
import authRouter from "./src/routes/auth.router";

connect(process.env.MONGODB_CONNECTION_URI + process.env.DB_NAME);

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors());
app.use('/api', mainRouter);

mainRouter.use('/auth', authRouter);

mainRouter.use(asyncHandler(authenticate));

mainRouter.use('/products', productRouter);
mainRouter.use('/profile/cart', cartRouter);

mainRouter.use(errorHandler);

app.listen(port, () => {
    console.log('Server listening on port ' + port);
});
