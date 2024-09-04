"use client";

import "./globals.css";

import {TopNavBar} from "@/components/TopNavBar";
import {TSFooter} from "@/components/TSFooter";
import {StyleProvider, StyleContext} from "../contexts/StyleContext";

import ThoughtSpotEmbed from "@/components/ThoughtSpotEmbed";

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    console.log("Rendering RootLayout");

    return (
        <html lang="en">
        <head>
            <meta charSet="utf-8"/>
            <title>TSE Advanced</title>
            <link rel="icon" href="/images/ts.png" type="images/png"/>
        </head>
        <body>
        <StyleProvider>
            <StyleContext.Consumer>
                {(style) => (
                    <>
                        <TopNavBar/>
                        <ThoughtSpotEmbed key={style.style.toString()}>
                            <div className="embeddedContent">{children}</div>
                        </ThoughtSpotEmbed>
                        <TSFooter/>
                    </>
                )}
            </StyleContext.Consumer>
        </StyleProvider>
        </body>
        </html>
    );
}
