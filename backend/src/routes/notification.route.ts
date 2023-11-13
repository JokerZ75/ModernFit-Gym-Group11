import express from 'express';
import Auth from '../Middlewares/Auth'; // not using yet
import notificationController from '../Controllers/notification.controller';

const router = express.Router();


router.route('/').get(notificationController.getNotifications);

module.exports = router;