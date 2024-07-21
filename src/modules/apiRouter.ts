import { Router } from "express";
import cryptocurrenciesRoute from "./cryptocurrencies/cryptocurrencies.route";

const apiRouter = Router();

apiRouter.use("/cryptocurrencies", cryptocurrenciesRoute);

export default apiRouter;