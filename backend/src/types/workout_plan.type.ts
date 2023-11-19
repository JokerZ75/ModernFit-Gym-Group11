type workout_plan = {
  User_id: string;
  Staff_id: string;
  Plan: {
    Monday: {
      WorkoutsList: string[];
    };
    Tuesday: {
      WorkoutsList: string[];
    };
    Wednesday: {
      WorkoutsList: string[];
    };
    Thursday: {
      WorkoutsList: string[];
    };
    Friday: {
      WorkoutsList: string[];
    };
  };
};
