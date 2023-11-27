import { ObjectId } from "mongoose";
import notificationController from "../Controllers/notification.controller";

const CreateCancelledClassNotification = async (
  classID: string,
  Recipents: ObjectId[],
  Description: string
) => {
  notificationController.CreateCancelledClassNotification(
    classID,
    Recipents,
    Description
  );
};

export default { CreateCancelledClassNotification };
