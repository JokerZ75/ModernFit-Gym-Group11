import React from "react";
import Class from "./class";

type classType = {
  _id?: string;
  Owner_id: string;
  Name: string;
  Type: "ongoing" | "cancelled";
  Date: Date;
  Duration: number;
  Branch_id: string;
};

const MyClassesContainer: React.FC<{ classes: classType[], type: "myClasses" | "upcomingClasses" }> = ({
  classes,type
}) => {
  return (
    <div className="flex flex-col gap-3 mt-5 h-[350px] md:h-[450px] overflow-y-scroll">
      {classes.map((c: classType) => {
        return <Class type={type} key={c._id} passedClass={c} />;
      })}
    </div>
  );
};

export default MyClassesContainer;
