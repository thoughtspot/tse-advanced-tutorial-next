"use client";

import React, { createContext, useState, useContext, useEffect } from "react";

import { getSession } from "next-auth/react";
import { getCookie } from "../lib/cookies";

// Create a style context with a default value
export const StyleContext = createContext({
  style: "default",
  setStyle: (newStyle: string) => {},
});

export const StyleProvider = ({ children }: { children: React.ReactNode }) => {
  const [style, setNewStyle] = useState("default");

  const setStyle = (newStyle: string) => {
    console.log("Setting style to: ", newStyle);
    setNewStyle(newStyle);
    document.cookie = `style-cookie=${encodeURIComponent(newStyle)}; path=/`;
  };

  useEffect(() => {
    const session = getSession();

    if (session) {
      console.log("Session found: ", session);

      const styleCookie = getCookie("style-cookie");
      console.log("style cookie: ", styleCookie);

      if (!styleCookie) {
        document.cookie = `style-cookie=${encodeURIComponent(
          "default"
        )}; path=/`;
      }
      setStyle(styleCookie as string);
    }
  }, []);

  console.log("style context rendering: ", style);

  return (
    <StyleContext.Provider value={{ style, setStyle }}>
      {children}
    </StyleContext.Provider>
  );
};

export const useStyle = () => {
  return useContext(StyleContext);
};
