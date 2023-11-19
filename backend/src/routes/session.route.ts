import sessionController from '../Controllers/session.controller';
import express from 'express';
import Auth from '../Middlewares/Auth';

const router = express.Router();


router.route('/2FA').post(sessionController.SendFor2FA);

router.route('/login').post(sessionController.StartSession);

router.route('/logout').post(sessionController.EndSession);

router.route('/refresh').post( sessionController.RefreshSession);

router.route('/verify').post(sessionController.VerifySession);


module.exports = router;