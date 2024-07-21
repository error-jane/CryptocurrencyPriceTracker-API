import express from "express";
import cors from "cors";
import morgan from "morgan";
import apiRouter from "./modules/apiRouter";
import notFound from "./middleware/notFound";
import jobManager from "./jobs/jobManager";
import "dotenv/config";
import { PrismaClient } from "@prisma/client";

const app = express();
const PORT = 3000;

app.use(cors())

app.use(express.json());

app.use(morgan("dev"));

app.use("/api", apiRouter);

app.use(notFound);


//conjobs
jobManager();

app.listen(PORT, async() =>{
    try {
        const db = new PrismaClient();
        await db.$connect();
        console.info(`Server is running at http://localhost:${PORT}`);
    } catch (error) {
        console.error(error);
    }
});