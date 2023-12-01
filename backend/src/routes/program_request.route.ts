import program_requestController from "../Controllers/program_request.controller";
import { Router } from "express";
import Auth from "../Middlewares/Auth";

const router = Router();

router.route("/").get(Auth, program_requestController.getAllProgramRequests);

router.route("/").post(Auth, program_requestController.makeProgramRequest);

router
  .route("/user")
  .get(Auth, program_requestController.getAUsersProgramRequest);

router.route("/assign/:id").post(Auth, program_requestController.assignUser);

router
  .route("/unassign/:id")
  .post(Auth, program_requestController.unassignUser);

router
  .route("/user/:id")
  .get(Auth, program_requestController.getUserProgramRequest);
module.exports = router;
