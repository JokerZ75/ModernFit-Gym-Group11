import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import QueryClientWrapper from "./components/QueryClientWrapper";
import { AuthContext } from "./components/JWTAuth/AuthContext";
import Navigation from "./components/Navigation";
import Header from "./components/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAddressBook,
  faAddressCard,
  faCalendarDays,
  faCircleInfo,
  faListUl,
  faGrip,
} from "@fortawesome/free-solid-svg-icons";
import Footer from "./components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const Links: Array<{ to: string; children: React.ReactNode }> = [
    {
      to: "/dashboard",
      children: (
        <>
          <FontAwesomeIcon icon={faGrip} />
          <p>dashboard</p>
        </>
      ),
    },
    {
      to: "/nutrition",
      children: (
        <>
          <FontAwesomeIcon icon={faCircleInfo} />
          <p>nutrition</p>
        </>
      ),
    },
    {
      to: "/activity-diary",
      children: (
        <>
          <FontAwesomeIcon icon={faAddressBook} />
          <p>my activity diary</p>
        </>
      ),
    },
    {
      to: "/program",
      children: (
        <>
          <FontAwesomeIcon icon={faListUl} />
          <p>my program</p>
        </>
      ),
    },
    {
      to: "/classes",
      children: (
        <>
          <FontAwesomeIcon icon={faCalendarDays} />
          <p>classes</p>
        </>
      ),
    },
    {
      to: "/profile",
      children: (
        <>
          <FontAwesomeIcon icon={faAddressCard} />
          <p>profile</p>
        </>
      ),
    },
  ];

  return (
    <QueryClientWrapper>
      <AuthContext
        authName="_auth"
        authType="cookie"
        cookieDomain={"localhost"}
        cookieSecure={false}
        cookieSameSite={true}
        cookieExpires={15}
        refresh_api_endpoint="http://localhost:5001/session/refresh"
        refreashTokenExpire={"session"}
        verify_api_endpoint="http://localhost:5001/session/verify"
        redirectTo="/"
      >
        <html lang="en">
          <body className="font-josefin">
            <Header>
              <Navigation Links={Links} />
            </Header>
            {children}
            <Footer />
          </body>
        </html>
      </AuthContext>
    </QueryClientWrapper>
  );
}