"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

import { LiveboardEmbed } from "@thoughtspot/visual-embed-sdk/react";

export default function LiveboardPage() {
  // The route is /liveboards/[liveboardId], so the slug is the liveboard GUID.
  const { liveboardId } = useParams<{ liveboardId: string }>();

  return (
    <div className="flex h-full w-full flex-col">
      <div className="px-4 py-2">
        <Link href="/liveboards" className="text-sm hover:font-bold">
          &larr; Back to liveboards
        </Link>
      </div>
      {/* 4.3 - Embed the liveboard selected from the list. */}
      <p>Embedding liveboard with ID: {liveboardId}</p>
    </div>
  );
}
