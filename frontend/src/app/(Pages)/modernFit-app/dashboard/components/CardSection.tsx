import React from "react";

type Props = {
  children?: React.ReactNode;
  heading: string;
};

const CardSection: React.FC<Props> = ({ children, heading }) => {
  return (
    <section className="border border-blue-200 flex flex-col px-5 py-2 rounded-xl mt-5 mb-0 last:mb-5">
      <div className="section-heading text-blue-200 font-bold text-xl mx-auto">
        <h2>{heading}</h2>
      </div>
      <div className="section-content">{children}</div>
    </section>
  );
};

export default CardSection;
