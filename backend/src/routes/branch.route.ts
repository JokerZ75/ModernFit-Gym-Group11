import branchController from '../Controllers/branch.controller';
import express from 'express';
import Auth from '../Middlewares/Auth';

const router = express.Router();

router.route('/').get(branchController.getBranches);

module.exports = router;