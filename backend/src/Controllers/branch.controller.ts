import { Request, Response } from "express";
import Branch from "../models/branch.model";

const getBranches = async (req: Request, res: Response) => {
  await Branch.find()
    .then((branches) => {
      branches = JSON.parse(JSON.stringify(branches));
      if (branches.length === 0) {
        return res.status(200).json({ msg: "No branches" });
      }
      res.status(200).json(branches);
    })
    .catch((err) => {
      res.status(400).json({ msg: err });
    });
};

export default { getBranches };