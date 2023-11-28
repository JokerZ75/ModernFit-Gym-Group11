import React from "react";
import Navigation from "@/app/components/Navigation";
import Header from "@/app/components/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAddressBook,
  faAddressCard,
  faCalendarDays,
  faCircleInfo,
  faListUl,
  faGrip,
} from "@fortawesome/free-solid-svg-icons";
import Footer from "@/app/components/Footer";
import ToastProvider from "@/app/components/ToastProvider";
import { QueryClient } from "@tanstack/react-query";
import { cookies } from "next/headers";
import axios, { AxiosError } from "axios";

const layout: React.FC<{ children: React.ReactNode }> = async ({
  children,
}) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
      },
    },
  });

  const cookieStore = cookies();
  const token = cookieStore.get("_auth_token")?.value;

  const isAdmin = await queryClient.fetchQuery({
    queryKey: ["isAdmin"],
    queryFn: async () => {
      const data: boolean = await axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/session/session-data`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          return (res.data?.position === "Admin") as boolean;
        })
        .catch((err: AxiosError) => {
          return false as boolean;
        });

      return data;
    },
  });

  const isTrainerOrNutritionist = await queryClient.fetchQuery({
    queryKey: ["isTrainer"],
    queryFn: async () => {
      const data: boolean = await axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/session/session-data`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          return (res.data?.position === "Trainer" ||
            res.data?.position === "Nutritionist") as boolean;
        })
        .catch((err: AxiosError) => {
          return false as boolean;
        });

      return data;
    },
  });


  let Links: Array<{ to: string; children: React.ReactNode }> = [
    {
      to: "/modernFit-app/dashboard",
      children: (
        <>
          <FontAwesomeIcon icon={faGrip} />
          <p>dashboard</p>
        </>
      ),
    },
    {
      to: "/modernFit-app/nutri-info",
      children: (
        <>
          <FontAwesomeIcon icon={faCircleInfo} />
          <p>nutrition</p>
        </>
      ),
    },
    {
      to: "/modernFit-app/activity-diary",
      children: (
        <>
          <FontAwesomeIcon icon={faAddressBook} />
          <p>my activity diary</p>
        </>
      ),
    },
    {
      to: "/modernFit-app/program",
      children: (
        <>
          <FontAwesomeIcon icon={faListUl} />
          <p>my program</p>
        </>
      ),
    },
    {
      to: "/modernFit-app/classes",
      children: (
        <>
          <FontAwesomeIcon icon={faCalendarDays} />
          <p>classes</p>
        </>
      ),
    },
    {
      to: "/modernFit-app/account",
      children: (
        <>
          <FontAwesomeIcon icon={faAddressCard} />
          <p>profile</p>
        </>
      ),
    },
  ];

  if (isAdmin) {
    Links.push({
      to: "/modernFit-app/admin-panel",
      children: (
        <>
          <FontAwesomeIcon icon={faAddressCard} />
          <p>admin panel</p>
        </>
      ),
    });
  }

  if (isTrainerOrNutritionist) {
    Links.push({
      to: "/modernFit-app/my-users",
      children: (
        <>
          <FontAwesomeIcon icon={faAddressCard} />
          <p>trainer panel</p>
        </>
      ),
    });
  }

  return (
    <html lang="en">
      <body className="font-josefin min-h-[100dvh] flex flex-col">
        <Header>
          <Navigation Links={Links} />
        </Header>
        <ToastProvider />
        {children}
        <Footer></Footer>
      </body>
    </html>
  );
};

export default layout;
