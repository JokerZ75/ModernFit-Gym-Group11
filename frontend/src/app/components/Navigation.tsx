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
  const navMenu = React.useRef<HTMLDivElement>(null);
  const [disableButton, setDisableButton] = React.useState(false);

  React.useEffect(() => {
    // Display if opening menu or closing
    setDisableButton(true);
    if (menuOpen) {
      navMenu.current?.classList.remove("hidden");
      navMenu.current?.classList.add("flex");
      setTimeout(() => {
        navMenu.current?.classList.add("left-0");
        navMenu.current?.classList.add("md:right-0");
        navMenu.current?.classList.remove("left-full");
        navMenu.current?.classList.remove("md:right-full");
        setDisableButton(false);
      }, 1);
    } else {
      setTimeout(() => {
        navMenu.current?.classList.add("hidden");
        navMenu.current?.classList.remove("flex");
        setDisableButton(false);
      }, 500);
      navMenu.current?.classList.add("left-full");
      navMenu.current?.classList.add("md:right-full");
      navMenu.current?.classList.remove("left-0");
      navMenu.current?.classList.remove("md:right-0");
    }
  }, [menuOpen]);

  return (
    <nav className="">
      <div
        id="burger-menu"
        onClick={() => {
          if (disableButton == false) setMenuOpen(true);
        }}
      >
        <div className="w-14 h-2 bg-orange-100 rounded-full mb-2 md:w-20 md:h-3"></div>
        <div className="w-14 h-2 bg-orange-100 rounded-full mb-2 md:w-20 md:h-3"></div>
        <div className="w-14 h-2 bg-orange-100 rounded-full md:w-20 md:h-3"></div>
      </div>
      <div
        className="hidden absolute top-0 left-full md:left-auto md:right-full transition-all duration-500 ease-in-out w-full"
        ref={navMenu}
      >
        <div
          id="opacity-cover-for-md"
          className="hidden md:block bg-black opacity-75 w-full"
          onClick={() => {
            if (disableButton == false) setMenuOpen(false);
          }}
        ></div>
        <div
          id="nav-menu"
          className="flex w-screen h-screen md:w-1/3 bg-white py-8 pt-7 p-5 flex-col z-50"
        >
          <div id="nav-menu-head" className="flex gap-5">
            <div id="deco-burger-menu" className="my-auto">
              <div className="w-14 h-2 bg-orange-100 rounded-full mb-2"></div>
              <div className="w-14 h-2 bg-orange-100 rounded-full mb-2"></div>
              <div className="w-14 h-2 bg-orange-100 rounded-full"></div>
            </div>
            <div
              id="menu-header"
              className="text-2xl header-blue-200 font-extrabold my-auto"
            >
              <h1>Menu</h1>
            </div>
            <div
              id="close-icon-button"
              className="text-5xl header-orange-100 font-extrabold ml-auto my-auto "
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
          <div id="join-now-button" className="mt-auto">
            <Link href="/register">
              <Button
                variant="default"
                size="fillWidth"
                rounded="circle"
                shadow="shadow2xl"
                hover="default"
                className="md:text-2xl "
              >
                join now
              </Button>
            </Link>
          </div>
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
    <li className="li-nav first:mt-0 mt-5">
      <Link href={to} {...props}>
        <div className="flex navigation-item gap-6">{children}</div>
      </Link>
    </li>
  );
};

export default Navigation;
