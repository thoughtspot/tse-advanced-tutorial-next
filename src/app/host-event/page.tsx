"use client";

import SyncedSearch from "./SyncedSearch";

import { useStyle } from "@/contexts/StyleContext";

export default function CustomActionPage() {
  const { style } = useStyle(); // used to refresh when the style changes.

  return (
    <>
      <SyncedSearch />
    </>
  );
}
