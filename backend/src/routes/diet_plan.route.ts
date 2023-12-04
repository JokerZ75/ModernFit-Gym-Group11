import diet_planController from "../Controllers/diet_plan.controller";
import { Router } from "express";
import Auth from "../Middlewares/Auth";

const router = Router();

router.route("/").get(Auth, diet_planController.getDietPlan);

router.route("/generate").get(diet_planController.generateDietPlan);

router.route("/send").post(Auth, diet_planController.sendDietPlan);

module.exports = router;
