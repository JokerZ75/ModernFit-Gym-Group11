"use client";

import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { Button } from "./UI/Button";
type NavigationProps = {
  Links?: Array<NavigationLinkProps>;
};

const Navigation: React.FC<NavigationProps> = ({ Links }) => {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const navContainer = React.useRef<HTMLDivElement>(null);
  const darkCover = React.useRef<HTMLDivElement>(null);
  const [url, setUrl] = React.useState<string>();
  const [disableButton, setDisableButton] = React.useState(false);

  React.useEffect(() => {
    setUrl(window.location.href);
  }, []);

  React.useEffect(() => {
    // Display if opening menu or closing
    setDisableButton(true);
    if (menuOpen) {
      navContainer.current?.classList.add("open-nav");
      navContainer.current?.classList.remove("closed-nav");
      darkCover.current?.classList.add("active-cover");
      darkCover.current?.classList.remove("inactive-cover");
      setTimeout(() => {
        setDisableButton(false);
      }, 500);
    } else {
      navContainer.current?.classList.remove("open-nav");
      navContainer.current?.classList.add("closed-nav");
      darkCover.current?.classList.remove("active-cover");
      darkCover.current?.classList.add("inactive-cover");
      setTimeout(() => {
        setDisableButton(false);
      }, 500);
    }
  }, [menuOpen]);

  return (
    <nav className="">
      <div
        id="burger-menu"
        onClick={() => {
          if (disableButton == false) setMenuOpen(true);
        }}
        className="cursor-pointer hover:brightness-150 transition-all duration-500 ease-in-out"
      >
        <div className="w-14 h-2 bg-orange-100 rounded-full mb-2 md:w-20 md:h-3"></div>
        <div className="w-14 h-2 bg-orange-100 rounded-full mb-2 md:w-20 md:h-3"></div>
        <div className="w-14 h-2 bg-orange-100 rounded-full md:w-20 md:h-3"></div>
      </div>
      <div
        className="closed-nav absolute top-0 transition-all duration-500 ease-in-out overflow-hidden flex z-50"
        ref={navContainer}
      >
        <div
          id="opacity-cover-for-md"
          className="hidden md:block bg-black inactive-cover transition-opacity duration-500 delay-500 ease-linear w-full"
          onClick={() => {
            if (disableButton == false) setMenuOpen(false);
          }}
          ref={darkCover}
        ></div>
        <div
          id="nav-menu"
          className="flex w-screen h-screen md:w-1/3 bg-white py-8 pt-7 p-5 flex-col z-50 overflow-hidden"
        >
          <div id="nav-menu-head" className="flex gap-5">
            <div id="deco-burger-menu" className="my-auto">
              <div className="w-14 h-2 bg-orange-100 rounded-full mb-2"></div>
              <div className="w-14 h-2 bg-orange-100 rounded-full mb-2"></div>
              <div className="w-14 h-2 bg-orange-100 rounded-full"></div>
            </div>
            <div
              id="menu-header"
              className="text-2xl text-blue-200 font-extrabold my-auto"
            >
              <h1>Menu</h1>
            </div>
            <div
              id="close-icon-button"
              className="text-5xl text-orange-100 font-extrabold ml-auto my-auto cursor-pointer hover:text-orange-200 "
              onClick={() => {
                if (disableButton == false) setMenuOpen(false);
              }}
            >
              <FontAwesomeIcon icon={faCircleXmark} />
            </div>
          </div>
          <div id="nav-items" className="mt-10">
            <ul>
              {Links?.map((link) => {
                return (
                  <NavigationLink key={link.to} to={link.to}>
                    {link.children}
                  </NavigationLink>
                );
              })}
            </ul>
          </div>
          {!url?.includes("modernFit-app") ? (
            <div id="join-now-button" className="mt-auto">
              <Link href="/register">
                <Button
                  variant="default"
                  size="fillWidth"
                  rounded="circle"
                  shadow="shadow2xl"
                  hover="default"
                  className="md:text-2xl whitespace-nowrap "
                >
                  join now
                </Button>
              </Link>
            </div>
          ) : null}
        </div>
      </div>
    </nav>
  );
};

type NavigationLinkProps = {
  to: string;
  children: React.ReactNode;
  props?: Array<any>;
};

const NavigationLink: React.FC<NavigationLinkProps> = ({
  to,
  children,
  ...props
}) => {
  return (
    <li className="li-nav first:mt-0 mt-5 hover:brightness-150 transition-all duration-300 ease-linear">
      <Link href={to} {...props}>
        <div className="flex navigation-item gap-6 whitespace-nowrap">
          {children}
        </div>
      </Link>
    </li>
  );
};

export default Navigation;
