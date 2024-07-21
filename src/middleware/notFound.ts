import { Request, Response } from "express";

export const NOTFOUND_STATUS = 404;

const notFound = (req: Request, res: Response) => {
    res.status(NOTFOUND_STATUS).json({ message: "Not Found" });
};

export default notFound;