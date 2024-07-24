"use client";

import Link from "next/link";
import { Dropdown, Navbar } from "flowbite-react";

import styles from "./TopNavBar.module.css";

export function TopNavBar() {
  return (
    <Navbar fluid className="bg-black text-white">
      <Navbar.Brand as={Link} href="/#">
        <img src="/images/ts.png" className="mr-3 h-6 sm:h-9" alt="TSE Logo" />
        <span className="self-center whitespace-nowrap text-xl font-semibold text-white">
          TSE Advanced
        </span>
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Navbar.Link className={styles.navlink} href="/host-event">
          Events
        </Navbar.Link>
        <Navbar.Link className={styles.navlink} href="/custom-action">
          Custom Actions
        </Navbar.Link>
        <Navbar.Link className={styles.navlink} href="/get-data">
          Data API
        </Navbar.Link>
        <Dropdown
          arrowIcon={true}
          inline
          label={"Style"}
          className="dark:text-white"
        >
          <Dropdown.Item>Normal</Dropdown.Item>
          <Dropdown.Item>Dark</Dropdown.Item>
        </Dropdown>
      </Navbar.Collapse>
    </Navbar>
  );
}
