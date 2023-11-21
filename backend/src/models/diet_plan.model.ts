import mongoose from "mongoose";

const Schema = mongoose.Schema;

const dietPlanSchema = new Schema(
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
          Breakfast: {
            type: String,
            required: true,
            trim: true,
            minlength: 3,
          },
          Lunch: {
            type: String,
            required: true,
            trim: true,
            minlength: 3,
          },
          Dinner: {
            type: String,
            required: true,
            trim: true,
            minlength: 3,
          },
          Snack: {
            type: String,
            required: true,
            trim: true,
            minlength: 3,
          },
        },
        Tuesday: {
          Breakfast: {
            type: String,
            required: true,
            trim: true,
            minlength: 3,
          },
          Lunch: {
            type: String,
            required: true,
            trim: true,
            minlength: 3,
          },
          Dinner: {
            type: String,
            required: true,
            trim: true,
            minlength: 3,
          },
          Snack: {
            type: String,
            required: true,
            trim: true,
            minlength: 3,
          },
        },
        Wednesday: {
          Breakfast: {
            type: String,
            required: true,
            trim: true,
            minlength: 3,
          },
          Lunch: {
            type: String,
            required: true,
            trim: true,
            minlength: 3,
          },
          Dinner: {
            type: String,
            required: true,
            trim: true,
            minlength: 3,
          },
          Snack: {
            type: String,
            required: true,
            trim: true,
            minlength: 3,
          },
        },
        Thursday: {
          Breakfast: {
            type: String,
            required: true,
            trim: true,
            minlength: 3,
          },
          Lunch: {
            type: String,
            required: true,
            trim: true,
            minlength: 3,
          },
          Dinner: {
            type: String,
            required: true,
            trim: true,
            minlength: 3,
          },
          Snack: {
            type: String,
            required: true,
            trim: true,
            minlength: 3,
          },
        },
        Friday: {
          Breakfast: {
            type: String,
            required: true,
            trim: true,
            minlength: 3,
          },
          Lunch: {
            type: String,
            required: true,
            trim: true,
            minlength: 3,
          },
          Dinner: {
            type: String,
            required: true,
            trim: true,
            minlength: 3,
          },
          Snack: {
            type: String,
            required: true,
            trim: true,
            minlength: 3,
          },
        },
      },
      required: true,
      trim: true,
      minlength: 3,
    },
  },
  { timestamps: true }
);

const DietPlan = mongoose.model("DietPlan", dietPlanSchema);

export default DietPlan;
