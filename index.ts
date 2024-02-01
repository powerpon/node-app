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
import { Server } from "http";
import gracefulServerShutdown from "./src/helpers/gracefulServerShutdown";
import responseTime from 'response-time';
import { logRequest } from "./src/middlewares/requestLogger";

export const DB_URI = process.env.MONGODB_CONNECTION_URI + process.env.DB_NAME;

connect(DB_URI);

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors());
app.use(responseTime(logRequest));
app.use('/api', mainRouter);
mainRouter.use('/auth', authRouter);

mainRouter.use(asyncHandler(authenticate));

mainRouter.use('/products', productRouter);
mainRouter.use('/profile/cart', cartRouter);

mainRouter.use(errorHandler);

const server: Server = app.listen(port, () => {
    console.log('Server listening on port ' + port);
});

gracefulServerShutdown(server);
