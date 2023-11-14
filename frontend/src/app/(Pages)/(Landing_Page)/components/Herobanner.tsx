import React from "react";
import Image from "next/image";
import HeroBannerImage from "@/app/Assets/Gym-landing-Hero-min.jpeg";
import { Button } from "@/app/components/UI/Button";
import Link from "next/link";

const HeroBanner: React.FC = () => {
  return (
    <div className="">
      <div className="relative">
        <div id="herobanner-image">
          <Image
            src={HeroBannerImage}
            alt="Hero Banner Image"
            className="object-cover h-[425px] md:h-[600px] w-full "
            height={400}
          />
        </div>
        <div
          id="herobanner-content"
          className="bg-blue-100 bg-opacity-80 absolute bottom-0 w-full pt-1 px-2"
        >
          <div id="herobanner-text" className="">
            <h2 className="font-bold text-xl md:ml-[25%] md:text-3xl">ModernFit Gym</h2>
            <p className="text-white font-bold md:ml-[25%] md:text-4xl">
              Personalised Programs From Top Nutritionists
            </p>
          </div>
          <Link href="/register" className="w-full flex mb-2">
            <Button
              variant="default"
              size="default"
              rounded="circle"
              shadow="shadowLg"
              hover="default"
              className="mt-5 w-3/4 mx-auto md:w-auto md:mx-0 md:ml-[25%] md:text-2xl"
            >
              join now
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
