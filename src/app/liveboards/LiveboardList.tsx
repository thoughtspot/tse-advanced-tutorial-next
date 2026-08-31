"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import {
  createBearerAuthenticationConfig,
  MetadataSearchResponse,
  ThoughtSpotRestApi,
} from "@thoughtspot/rest-api-sdk";

import { constants } from "@/lib/constants";
import { getAuthToken } from "@/lib/trusted_auth";

// -1 tells the metadata search API to return all matching objects.
const ALL_RECORDS = -1;

// API configuration using the same token call as the embed.
const tokenConfig = createBearerAuthenticationConfig(constants.tsURL, () => {
  return getAuthToken();
});

// The subset of the metadata header that the tile displays.
interface LiveboardInfo {
  id: string;
  name: string;
  description: string;
  author: string;
  modified: number; // epoch milliseconds
}

// The metadata_header in the response is untyped in the SDK, so pull out the fields we need.
const toLiveboardInfo = (item: MetadataSearchResponse): LiveboardInfo => {
  const header = item.metadata_header ?? {};
  return {
    id: item.metadata_id ?? "",
    name: item.metadata_name ?? "(unnamed)",
    description: header.description ?? "",
    author: header.authorDisplayName ?? header.authorName ?? "unknown",
    modified: header.modified ?? 0,
  };
};

/**
 * Use the Typscript SDK to get the list of liveboards the user can access, and display them in a grid of tiles.
 */
const LiveboardList = () => {
  const [liveboards, setLiveboards] = useState<LiveboardInfo[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // 4.1 - Get the list of liveboards the user can access using the metadata search API.
    // const api; // create a new, authenticated client.
    /* Add the proper call to get the liveboards for the user.
    api
      .then((results) => {
        console.log("metadata search results", results);
        setLiveboards(results.map(toLiveboardInfo));
      })
      .catch((err) => {
        console.error(err);
        setError("Unable to load liveboards.");
      });
    */
  }, []);

  return (
    <div className="w-full overflow-y-auto p-6">
      <h1 className="mb-4">Liveboards</h1>

      {error && <p className="text-red-600">{error}</p>}
      {!error && !liveboards && <p>Loading.....</p>}
      {liveboards && liveboards.length === 0 && <p>No liveboards found.</p>}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {liveboards?.map((lb) => (
          <LiveboardTile key={lb.id} liveboard={lb} />
        ))}
      </div>
    </div>
  );
};

interface LiveboardTileProps {
  liveboard: LiveboardInfo;
}

// A tile links to the liveboard route using the GUID as the slug.
const LiveboardTile = ({ liveboard }: LiveboardTileProps) => {
  const lastUpdated = liveboard.modified
    ? new Date(liveboard.modified).toLocaleString()
    : "unknown";

  return (
    <Link
      href={`/liveboards/${liveboard.id}`}
      className="flex flex-col rounded-lg border border-gray-300 bg-white p-4 shadow hover:border-black hover:shadow-md"
    >
      <h2 className="mb-2 text-lg font-semibold">{liveboard.name}</h2>
      <p className="mb-4 flex-grow text-sm text-gray-700">
        {liveboard.description || "No description"}
      </p>
      <p className="text-xs text-gray-500">Author: {liveboard.author}</p>
      <p className="text-xs text-gray-500">Last updated: {lastUpdated}</p>
    </Link>
  );
};

export default LiveboardList;
