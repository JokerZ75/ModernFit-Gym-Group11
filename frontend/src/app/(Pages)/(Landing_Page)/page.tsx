"use client";
import Image from "next/image";
import { Button } from "../../components/UI/Button";
import HeroBanner from "./components/Herobanner";
import map from "@/app/Assets/maps.jpg";
import Link from "next/link";
import AboutUsProperties from "./components/AboutUsProperties";
import {
  faAddressBook,
  faHandSparkles,
} from "@fortawesome/free-solid-svg-icons";
import ClassCardImage from "@/app/Assets/Hero-alternate-min.jpeg";
import ClassesAvailableCard from "./components/ClassessAvailableCard";
import Carousel from "@/app/components/Carousel";
import axios from "axios";
import { useAuthContext } from "@/app/components/JWTAuth/AuthContext";
import React from "react";

export default function Home() {
  const { api_url, login } = useAuthContext();
  React.useEffect(() => {
    const log = async () => {
      const data = await axios.post(`${api_url}/session/login`, {
        email: "deaconhughes07@gmail.com",
        password: "123456",
      });
      const { accessToken, refreshToken, tokenType } = data.data;
      login({ accessToken, refreshToken, tokenType });
    };
    log();
  }, []);
  
  return (
    // Classnames hacky way to fix scroller issue appearing over the nav
    <main className="">
      <HeroBanner />
      <Link href="/login" className="flex mt-2 mb-4">
        <Button
          shadow="default"
          size="default"
          variant="default"
          hover="default"
          rounded="circle"
          className="w-3/4 border mx-auto"
        >
          Test Login
        </Button>
      </Link>
      <Link href="/register" className="flex mt-2 mb-4">
        <Button
          shadow="default"
          size="default"
          variant="default"
          hover="default"
          rounded="circle"
          className="w-3/4 border mx-auto"
        >
          Test Register
        </Button>
      </Link>
      <div
        id="map-card"
        className="mx-8 md:mx-24 mt-3 border-2 border-gray-200 rounded-xl"
      >
        <div id="map-image" className="">
          <Image
            src={map}
            alt="map"
            className="md:h-[250px] md:object-cover rounded-t-xl"
          />
        </div>
        <div id="map-card-content" className="mt-2">
          <h2 className="font-bold text-xl text-blue-200 text-center">
            find your local gym
          </h2>
          <Link href="/maps" className="flex mt-2 mb-4">
            <Button
              shadow="default"
              size="default"
              variant="nobackground"
              border="borderBlack"
              className="text-black w-1/2 border hover:border-gray-400 mx-auto"
              rounded="circle"
            >
              find
            </Button>
          </Link>
        </div>
      </div>
      <div id="about-us" className="mx-8 md:mx-24 mt-5">
        <div id="abous-us-heading">
          <h2 className="text-blue-200 text-2xl md:text-4xl font-bold">
            about us
          </h2>
        </div>
        <div id="about-us-content" className="mt-2">
          <div className="">
            <p className="">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet
              esse ut ullam qui soluta dolor recusandae eligendi commodi,
              numquam hic consectetur architecto placeat aliquid porro
              laudantium omnis iure a autem. Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Quasi magnam quas impedit et,
              itaque, provident voluptate consequuntur esse vitae eaque fugiat
              repudiandae perspiciatis minima beatae earum eius sunt, quos
              corporis?
            </p>
            <div className="flex mt-2">
              <AboutUsProperties
                icon={faHandSparkles}
                text="Seasoned Specialists"
                className="ml-auto"
              />
              <AboutUsProperties
                icon={faAddressBook}
                text="Personalised Programs"
                className="ml-3 md:ml-12 mr-auto"
              />
            </div>
          </div>
          <Link href="/register" className="flex mt-2 mb-4">
            <Button
              shadow="default"
              size="default"
              variant="default"
              hover="default"
              rounded="circle"
              className="w-3/4 border mx-auto"
            >
              join now
            </Button>
          </Link>
        </div>
      </div>
      <div className="mx-8 mt-8">
        <Carousel>
          <ClassesAvailableCard image={ClassCardImage} text="Class Example" />
          <ClassesAvailableCard image={ClassCardImage} text="Class Example" />
          <ClassesAvailableCard image={ClassCardImage} text="Class Example" />
        </Carousel>
      </div>
    </main>
  );
}
