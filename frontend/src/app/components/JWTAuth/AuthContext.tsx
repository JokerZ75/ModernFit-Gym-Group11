"use client";
import axios from "axios";
import React, { createContext, useContext, useState, useEffect } from "react";

type LoginDetails = {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
};

type refreashDetails = {
  refreashInterval: number;
};

const Context = createContext<{
  login: (details: LoginDetails) => void;
  logout: () => void;
  Headers: {};
  verify_api_endpoint: string;
  isAuthenticated: boolean;
  api_url: string;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  redirectTo: string;
}>(undefined!);

export const AuthContext = ({
  children,
  authName = "_auth",
  authType = "cookie",
  cookieDomain = null,
  cookieSecure = null,
  cookieSameSite = true,
  cookieExpires = null,
  refresh_api_endpoint = "",
  verify_api_endpoint = "",
  refreashTokenExpire = null,
  redirectTo = "",
  API_ENDPOINT = "",
}: {
  children: React.ReactNode;
  authName?: string;
  authType?: string;
  cookieDomain?: string | null;
  cookieSecure?: boolean | null;
  cookieSameSite?: boolean | null;
  cookieExpires?: number | null;
  refresh_api_endpoint?: string;
  verify_api_endpoint?: string;
  refreashTokenExpire?: number | null | "session";
  redirectTo?: string;
  API_ENDPOINT?: string;
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [Headers, setHeaders] = useState({});
  const [api_url] = useState(API_ENDPOINT);

  const getRefreshToken = () => {
    return document.cookie
      .split(";")
      .find((c) => c.trim().startsWith(`${authName}_refreshToken=`))
      ?.split("=")[1];
  };
  const getJwtToken = () => {
    return document.cookie
      .split(";")
      .find((c) => c.trim().startsWith(`${authName}_token=`))
      ?.split("=")[1];
  };
  const getJwtTokenType = () => {
    return document.cookie
      .split(";")
      .find((c) => c.trim().startsWith(`${authName}_tokenType=`))
      ?.split("=")[1];
  };
  const getExpires = () => {
    const expires = new Date();
    if (cookieExpires === null) cookieExpires = 15;
    expires.setMinutes((expires.getMinutes() + cookieExpires) as number);
    return expires;
  };

  const getRefreshExpires = () => {
    const expires = new Date();
    if (refreashTokenExpire === null) refreashTokenExpire = 15;
    expires.setMinutes(
      (expires.getMinutes() + (refreashTokenExpire as number)) as number
    );
    return expires;
  };

  const getExpiresAsMiliseconds = () => {
    if (cookieExpires === null) cookieExpires = 15;
    return cookieExpires * 60 * 1000;
  };

  const login = (details: LoginDetails) => {
    const { accessToken: token, refreshToken } = details;
    // store as cookies
    let tokenType = "Bearer";
    document.cookie = `${authName}_token=${token};Domain=${cookieDomain};HostOnly=${cookieSameSite}; expires=${getExpires()}; path=/; Secure=${cookieSecure}`;
    if (refreashTokenExpire === "session") {
      document.cookie = `${authName}_refreshToken=${refreshToken};Domain=${cookieDomain};HostOnly=${cookieSameSite}; expires=${"session"}; path=/; Secure=${cookieSecure}`;
    } else {
      document.cookie = `${authName}_refreshToken=${refreshToken};Domain=${cookieDomain};HostOnly=${cookieSameSite}; expires=${getRefreshExpires()}; path=/; Secure=${cookieSecure}`;
    }
    document.cookie = `${authName}_tokenType=${tokenType};Domain=${cookieDomain};HostOnly=${cookieSameSite}; expires=${"session"}; path=/; Secure=${cookieSecure}`;
    setHeaders(getHeaders());
    if (refresh_api_endpoint != "") {
      Refresh();
    }
  };

  const logout = () => {
    document.cookie = `${authName}_token=;Domain=${cookieDomain};HostOnly=${cookieSameSite}; expires=${getExpires()}; path=/; Secure=${cookieSecure}`;
    document.cookie = `${authName}_refreshToken=;Domain=${cookieDomain};HostOnly=${cookieSameSite}; expires=${getRefreshExpires()}; path=/; Secure=${cookieSecure}`;
    document.cookie = `${authName}_tokenType=;Domain=${cookieDomain};HostOnly=${cookieSameSite}; expires=${getExpires()}; path=/; Secure=${cookieSecure}`;
  };

  const getHeaders = () => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `${getJwtTokenType()}: ${getJwtToken()}`,
    };
    return headers;
  };

  const Refresh = async () => {
    const refreshInterval = getExpiresAsMiliseconds() - 500;
    setInterval(async () => {
      const headers = getHeaders();
      const refresh_token = getRefreshToken();

      await axios
        .post(
          `${refresh_api_endpoint}`,
          {
            refreshToken: refresh_token,
          },
          {
            headers: headers,
          }
        )
        .then((response) => {
          const { accessToken } = response.data;
          document.cookie = `${authName}_token=${accessToken};Domain=${cookieDomain};HostOnly=${cookieSameSite}; expires=${getExpires()}; path=/; Secure=${cookieSecure}`;
        });
    }, refreshInterval);
  };

  return (
    <Context.Provider
      value={{
        login,
        logout,
        Headers,
        verify_api_endpoint,
        isAuthenticated,
        setIsAuthenticated,
        redirectTo,
        api_url,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useAuthContext = () => useContext(Context);
