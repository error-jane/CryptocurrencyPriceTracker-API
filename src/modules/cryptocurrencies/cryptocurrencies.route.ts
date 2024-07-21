import { Router } from "express";
import cryptocurrenciesController from "./cryptocurrencies.controller";

const cryptocurrenciesRoute = Router();

cryptocurrenciesRoute.get("/", cryptocurrenciesController.getAllCoin);
cryptocurrenciesRoute.post("/", cryptocurrenciesController.addCoin);
cryptocurrenciesRoute.put("/:id", cryptocurrenciesController.updateCoin);
cryptocurrenciesRoute.delete("/:id", cryptocurrenciesController.deleteCoin);

export default cryptocurrenciesRoute;
