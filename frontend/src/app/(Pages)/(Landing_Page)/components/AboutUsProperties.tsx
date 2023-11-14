import React from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { cn } from "@/app/utils/classMerge";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

const AboutUsProperties: React.FC<{
  icon: IconDefinition;
  text: string;
  className?: string;
}> = ({ icon, text, className }) => {
  return (
    <div className={cn("flex justify-center items-center", className)}>
      <div className="image-container border rounded-full p-2">
        <FontAwesomeIcon icon={icon} className="text-2xl md:text-4xl text-blue-200" />
      </div>
      <div className="text-container ml-1">
        <p className=" font-bold md:text-2xl">{text}</p>
      </div>
    </div>
  );
};

export default AboutUsProperties;
