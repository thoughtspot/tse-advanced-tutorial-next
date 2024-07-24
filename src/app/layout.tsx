"use client";

import "./globals.css";
import { TopNavBar } from "../components/TopNavBar";
import { TSFooter } from "../components/TSFooter";

import { AuthStatus, AuthType, init } from "@thoughtspot/visual-embed-sdk";

import { getAuthToken } from "@/lib/utils";
import { constants } from "@/lib/constants";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  console.log("Initializing ThoughtSpot SDK");

  const ee = init({
    thoughtSpotHost: constants.tsURL,
    authType: AuthType.TrustedAuthToken,
    username: constants.username,
    getAuthToken: () => {
      return getAuthToken(constants.username);
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

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <title>TSE Advanced</title>
        <link rel="icon" href="/images/ts.png" type="images/png" />
      </head>
      <body>
        <TopNavBar />
        <div className="embeddedContent">{children}</div>
        <TSFooter />
      </body>
    </html>
  );
}
