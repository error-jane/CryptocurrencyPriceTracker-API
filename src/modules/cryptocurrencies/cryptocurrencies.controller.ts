import { PrismaClient } from "@prisma/client";
import { Response, Request } from "express";
import coin from "../../model/coin";
import stringUtil from "../../utils/stringUtil";

//Get all cryptocurrency prices
const getAllCoin = async (req: Request, res: Response) => {
    try {
        const db = new PrismaClient();
        const result = await db.cryptocurrencies.findMany({
            orderBy: {
                price: "desc",
            },
        });
        res.json(result);
    } catch (error) {
        res.status(400).json(error);
    }
};

//Add a new cryptocurrency price
const addCoin = async (req: Request, res: Response) => {
    try {
        const db = new PrismaClient();
        const coin: coin = req.body;
        //validate
        if(stringUtil.isNullOrWhitespace(coin.name)) throw ({errorMsg: `Param Missing: 'name'`});
        if(stringUtil.isNullOrWhitespace(coin.symbol)) throw ({errorMsg: `Param Missing: 'symbol'`});
        if(coin.price == null || coin.price <= 0) throw ({errorMsg: `Param Missing: 'price'`});

        //check duplicate
        const result = await db.cryptocurrencies.findFirst({
            where: {
                "OR":[
                    {name: coin.name},
                    {symbol: coin.symbol},
                ]
            },
        });

        if(result != null)throw ({errorMsg: `Duplicate data, Please change 'name' or 'symbol'`});

        //insert
        await db.cryptocurrencies.create({
            data: {
                name: coin.name,
                symbol: coin.symbol.toUpperCase(),
                price: coin.price,
            }
        });

        const resultUpdate = await db.cryptocurrencies.findFirst({
            where: {
                symbol: coin.symbol.toUpperCase(),
            },
        });

        res.json(resultUpdate);
    } catch (error) {
        res.status(400).json(error);
    }
};

// Update the price of an existing cryptocurrency
const updateCoin = async (req: Request, res: Response) => {
    try {
        const db = new PrismaClient();
        const id = req.params.id;
        if(stringUtil.isNullOrWhitespace(id)) throw ({errorMsg: `Param Missing: 'id'`});
        const coin: coin = req.body;

        const result = await db.cryptocurrencies.findFirst({
            where: {
                id: parseInt(id)
            },
        });
        if(result == null)throw ({errorMsg: `Data Not Found`});
        await db.cryptocurrencies.update({
            data: {
                name: coin.name,
                symbol: coin.symbol.toUpperCase(),
                price: coin.price,
            },
            where:{ id: parseInt(id)
            }
        });

        const resultUpdate = await db.cryptocurrencies.findFirst({
            where: {
                id: parseInt(id),
            },
        });

        res.json(resultUpdate);
    } catch (error) {
        res.status(400).json(error);
    }
};

//Delete a cryptocurrency
const deleteCoin = async (req: Request, res: Response) => {
    try {
        const db = new PrismaClient();
        const id = req.params.id;
        if(stringUtil.isNullOrWhitespace(id)) throw ({errorMsg: `Param Missing: 'id'`});
        const coin: coin = req.body;

        const result = await db.cryptocurrencies.findFirst({
            where: {
                id: parseInt(id)
            },
        });
        if(result == null)throw ({errorMsg: `Data Not Found`});
        await db.cryptocurrencies.delete({
            where:{ id: parseInt(id)
            }
        });

        res.json(result);
    } catch (error) {
        res.status(400).json(error);
    }
};

const cryptocurrenciesController = {
    getAllCoin,
    addCoin,
    updateCoin,
    deleteCoin,
};

export default cryptocurrenciesController;
