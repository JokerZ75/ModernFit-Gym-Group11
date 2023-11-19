import mongoose from "mongoose";

const Schema = mongoose.Schema;

const workoutPlanSchema = new Schema(
  {
    User_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    Staff_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Staff",
    },
    Plan: {
      type: {
        Monday: {
          WorkoutsList: [
            {
              type: String,
              required: true,
              trim: true,
              minlength: 3,
            },
          ],
        },
        Tuesday: {
          WorkoutsList: [
            {
              type: String,
              required: true,
              trim: true,
              minlength: 3,
            },
          ],
        },
        Wednesday: {
          WorkoutsList: [
            {
              type: String,
              required: true,
              trim: true,
              minlength: 3,
            },
          ],
        },
        Thursday: {
          WorkoutsList: [
            {
              type: String,
              required: true,
              trim: true,
              minlength: 3,
            },
          ],
        },
        Friday: {
          WorkoutsList: [
            {
              type: String,
              required: true,
              trim: true,
              minlength: 3,
            },
          ],
        },
      },
      required: true,
      trim: true,
      minlength: 3,
    },
  },
  {
    timestamps: true,
  }
);

const WorkoutPlan = mongoose.model("WorkoutPlan", workoutPlanSchema);

export default WorkoutPlan;
