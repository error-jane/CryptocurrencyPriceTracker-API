import { PrismaClient } from "@prisma/client";
import axios from "axios";
import coinmarketCapCoinList from "../../model/coinmarketCapCoinList";
import "dotenv/config";

const COINMARKET_CAP_URL = process.env.COINMARKET_CAP_URL;
const COIN_MARKET_API = process.env.COIN_MARKET_API;

const pullingCoinData = async () => {
    try {
        const httpRequest = axios.create({
            baseURL: COINMARKET_CAP_URL,
            headers: {
                "X-CMC_PRO_API_KEY": COIN_MARKET_API,
            },
        });

        const { data } = await httpRequest.get<coinmarketCapCoinList>(
            "/cryptocurrency/listings/latest"
        );

        const db = new PrismaClient();

        const transactions = [];

        console.info(`All data have ${data.data.length} `);

        for (const coin of data.data) {
            transactions.push(
                db.cryptocurrencies.upsert({
                    create: {
                        id: coin.id,
                        name: coin.name,
                        symbol: coin.symbol,
                        price: coin.quote.USD.price,
                    },
                    update: {
                        name: coin.name,
                        symbol: coin.symbol,
                        price: coin.quote.USD.price,
                    },
                    where: {
                        id: coin.id,
                    },
                })
            );
        }

        await db.$transaction(transactions);

        console.info(`Coin data has been pulled successfully`);
    } catch (error) {
        return error;
    }
};

export default pullingCoinData;
