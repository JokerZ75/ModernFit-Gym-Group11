import Image, { StaticImageData } from "next/image";
import React from "react";

const ClassesAvailableCard: React.FC<{
  text: string;
  image: StaticImageData | string;
}> = ({ text, image }) => {
  return (
    <div className="classes-card-container border-2 border-gray-200 rounded-xl w-[200px] md:w-[350px] -z-10">
      <div className="classes-card-image">
        <Image src={image} alt="Classes Available" className="object-cover w-full rounded-t-xl" />
      </div>
      <div className="classes-card-text py-8">
        <p className="text-center text-blue-200 font-bold md:text-xl">{text}</p>
      </div>
    </div>
  );
};

export default ClassesAvailableCard;
