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

const GenerateBranches = async (req: Request, res: Response) => {
  const branches = [
    {
      Name: "Branch 1",
      Address: "Address 1",
    },
    {
      Name: "Branch 2",
      Address: "Address 2",
    },
  ];
  await Branch.insertMany(branches)
    .then(() => {
      res.status(200).json({ msg: "Branches generated" });
    })
    .catch((err) => {
      console.log(err);
    });
};

export default { getBranches, GenerateBranches };