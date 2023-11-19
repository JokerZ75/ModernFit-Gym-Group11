import DietPlan from "../models/diet_plan.model";
import { Request, Response } from "express";

const getDietPlan = async (req: Request, res: Response) => {
  const user = req.body.user;
  await DietPlan.findOne({ User_id: user.id })
    .then((diet_plan) => {
      diet_plan = JSON.parse(JSON.stringify(diet_plan));
        if (!diet_plan) {
            return res.status(200).json({ msg: "No diet plan" });
        }
      res.status(200).json(diet_plan);
    })
    .catch((err) => {
      res.status(400).json({ msg: err });
    });
};

const generateDietPlan = async (req: Request, res: Response) => {
  const nDietPlan = {
    User_id: "5f9e3b3b9d3b9b1b3c9d3b9b",
    Staff_id: "5f9e3b3b9d3b9b1b3c9d3b9b",
    Plan: {
      Monday: {
        Breakfast:
          "Five egg whites, one whole egg, 1/2 cup cooked oatmeal, 1/2 cup blueberries",
        Lunch: "6 ounces tuna, 1 cup brown rice, 1 cup steamed broccoli",
        Dinner:
          "6 ounces grilled chicken, 1 cup cooked couscous, 1 cup steamed broccoli",
        Snack:
          "1/2 cup low-fat cottage cheese topped with 1/2 cup mandarin orange slices",
      },
      Tuesday: {
        Breakfast: "3/4 cup bran flakes, 1 banana, 1 cup fat-free milk",
        Lunch:
          "Low-fat turkey sandwich (3 ounces turkey breast, 1/2 piece whole wheat bread, 1 teaspoon mustard, tomato slices, lettuce)",
        Dinner:
          "4 ounces lean pork tenderloin stir-fried with onions, garlic, broccoli, and bell peppers, served over 1/2 cup cooked brown rice",
        Snack:
          "Smoothie made with 3/4 cup skim milk, 1/2 banana, 1/2 cup low-fat yogurt, and 1/4 cup sliced strawberries",
      },
      Wednesday: {
        Breakfast:
          "Omelet made with 4 egg whites and 1 whole egg, 1/4 cup chopped broccoli, 2 tablespoons each fat-free refried beans, diced onion, diced mushrooms, and salsa",
        Lunch:
          "4 ounces sliced turkey breast, 1/2 cup cooked quinoa, 8 baby carrots, 10 snow peas",
        Dinner:
          "4 ounces shrimp stir-fried with 1 cup mixed frozen vegetables, 1/2 cup brown rice, and 1 tablespoon light teriyaki sauce",
        Snack:
          "1/2 cup fat-free Greek yogurt topped with 1/4 cup sliced strawberries",
      },
      Thursday: {
        Breakfast:
          "Smoothie made with 3/4 cup skim milk, 1/2 banana, 1/2 cup low-fat yogurt, and 1/4 cup sliced strawberries",
        Lunch:
          "Salad made with 2 cups baby spinach, 4 ounces grilled chicken, 1 tablespoon chopped dried cranberries, 3 slices avocado, 1 tablespoon slivered walnuts, and 2 tablespoons low-fat vinaigrette",
        Dinner:
          "4 ounces broiled flounder or sole, 2 sliced plum tomatoes sprinkled with 2 tablespoons grated Parmesan cheese, broiled until just golden",
        Snack:
          "1/2 cup low-fat cottage cheese topped with 1/2 cup mandarin orange slices",
      },
      Friday: {
        Breakfast: "3/4 cup bran flakes, 1 banana, 1 cup fat-free milk",
        Lunch:
          "Salad made with 2 cups baby spinach, 4 ounces grilled chicken, 1 tablespoon chopped dried cranberries, 3 slices avocado, 1 tablespoon slivered walnuts, and 2 tablespoons low-fat vinaigrette",
        Dinner:
          "4 ounces shrimp stir-fried with 1 cup mixed frozen vegetables, 1/2 cup brown rice, and 1 tablespoon light teriyaki sauce",
        Snack:
          "Smoothie made with 3/4 cup skim milk, 1/2 banana, 1/2 cup low-fat yogurt, and 1/4 cup sliced strawberries",
      },
    },
  };
  const newDietPlan = new DietPlan(nDietPlan);

  try {
    const savedDietPlan = await newDietPlan.save();
    res.json(savedDietPlan);
  } catch (err) {
    res.json({ message: err });
  }
};


export default { getDietPlan, generateDietPlan };