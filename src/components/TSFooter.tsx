"use client";

import { Footer } from "flowbite-react";

import { constants } from "../lib/constants";

export function TSFooter() {
  return (
    <Footer container className="absolute bottom min-w-full">
      <Footer.Copyright
        href="https://thoughtspot.com"
        by="ThoughtSpot™"
        year={2024}
      />
      <Footer.LinkGroup>
        <Footer.Link href="https://developers.thoughtspot.com/docs">
          Developer Docs
        </Footer.Link>
        <Footer.Link href="#">User: {constants.username}</Footer.Link>
      </Footer.LinkGroup>
    </Footer>
  );
}
