import { Request, Response } from "express";

const getTest = (req: Request, res: Response) => {
    res.send("Hello World!");
};

const getTestWithID = (req: Request, res: Response) => {
    res.send("Hello World with ID! ID: " + req.params.id);
};

export default { getTest, getTestWithID };
