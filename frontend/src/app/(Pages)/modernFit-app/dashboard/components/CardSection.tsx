import React from "react";
import { cn } from "@/app/utils/classMerge";

type Props = {
  children?: React.ReactNode;
  heading: string;
  className?: string;
};

const CardSection: React.FC<Props> = ({ children, heading,className }) => {
  return (
    <section className={cn("border border-blue-200 flex flex-col px-5 py-2 rounded-xl mt-5 mb-0 last:mb-5 md:h-full md:justify-center", className)}>
      <div className="section-heading text-blue-200 font-bold text-xl md:text-4xl mx-auto md:mb-auto">
        <h2 >{heading}</h2>
      </div>
      <div className="section-content md:mb-auto">{children}</div>
    </section>
  );
};

export default CardSection;
