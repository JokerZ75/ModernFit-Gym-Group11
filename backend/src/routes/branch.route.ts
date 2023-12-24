import branchController from '../Controllers/branch.controller';
import express from 'express';
import Auth from '../Middlewares/Auth';

const router = express.Router();

router.route('/').get(branchController.getBranches);

// router.route('/generate').get(branchController.GenerateBranches);

module.exports = router;