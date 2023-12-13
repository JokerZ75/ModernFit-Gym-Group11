import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import QueryClientWrapper from "./components/QueryClientWrapper";
import { AuthContext } from "./components/JWTAuth/AuthContext";
import 'react-toastify/dist/ReactToastify.css';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ModernFit Gym",
  description: "A gym for the modern age, with modern equipment and modern people.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <QueryClientWrapper>
      <AuthContext
        authName="_auth"
        authType="cookie"
        cookieDomain={"localhost"}
        cookieSecure={false}
        cookieSameSite={"strict"}
        cookieExpires={10}
        refresh_api_endpoint={`${process.env.NEXT_PUBLIC_API_URL}/session/refresh`}
        refreashTokenExpire={"session"}
        verify_api_endpoint={`${process.env.NEXT_PUBLIC_API_URL}/session/verify`}
        redirectTo="/"
        API_ENDPOINT={`${process.env.NEXT_PUBLIC_API_URL}`}
      >
        {children}
      </AuthContext>
    </QueryClientWrapper>
  );
}
