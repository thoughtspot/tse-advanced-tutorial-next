"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import "./globals.css";
import { TopNavBar } from "../components/TopNavBar";
import { TSFooter } from "../components/TSFooter";

import {
  AuthStatus,
  AuthType,
  customCssInterface,
  init,
} from "@thoughtspot/visual-embed-sdk";

import { getAuthToken } from "@/lib/utils";
import { constants, cssFiles } from "@/lib/constants";

// current options are 'default' and 'dark'. See cssFiles in constants.js
let cssStyle = "dark";

const tsInitialize = () => {
  console.log("Initializing ThoughtSpot SDK");

  let customCss: customCssInterface;
  if (cssStyle === "dark") {
    // dark mode requires a special CSS rule for tables.
    customCss = {
      rules_UNSTABLE: {
        ".bk-outline .ag-theme-alpine .ag-row": {
          color: "white",
        },
      },
    };
  } else {
    customCss = {};
  }

  console.log("initializing with cssStyle: ", cssStyle);

  const ee = init({
    thoughtSpotHost: constants.tsURL,
    authType: AuthType.TrustedAuthToken,
    username: constants.username,
    getAuthToken: () => {
      return getAuthToken(constants.username);
    },
    callPrefetch: true,
    customizations: {
      style: {
        customCSSUrl: cssFiles[cssStyle as keyof typeof cssFiles],
        customCSS: customCss,
      },
      content: {
        strings: {
          Go: "Search",
        },
      },
    },
  });

  if (ee) {
    ee.on(AuthStatus.SUCCESS, () => {
      console.log("Success");
    })
      .on(AuthStatus.SDK_SUCCESS, () => {
        console.log("SDK Success");
      })
      .on(AuthStatus.FAILURE, (reason) => {
        console.log("Failure:  " + reason);
      });
  }
};

tsInitialize();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [style, setStyle] = useState("");
  const [key, setKey] = useState(0);

  const changeStyle = (style: string) => {
    console.log("Changing style to: " + style);
    cssStyle = style;
    tsInitialize();
    setKey((prevKey) => prevKey + 1); // force re-render
  };

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <title>TSE Advanced</title>
        <link rel="icon" href="/images/ts.png" type="images/png" />
      </head>
      <body>
        <TopNavBar setStyle={changeStyle} />
        <div className="embeddedContent">{children}</div>
        <TSFooter />
      </body>
    </html>
  );
}
