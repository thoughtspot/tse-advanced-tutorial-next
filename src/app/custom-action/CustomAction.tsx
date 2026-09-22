"use client";

import { useCallback } from "react";

import { SearchEmbed } from "@thoughtspot/visual-embed-sdk/react";
import {
  CustomActionTarget,
  CustomActionsPosition,
} from "@thoughtspot/visual-embed-sdk";

import { ActionData, ActionDataType } from "tse-data-classes";

const CustomAction = () => {
  // 3.2 - Handle custom action callback
  const handleCustomAction = useCallback((payload: any) => {
    console.log("Custom action triggered:", payload);

    // Check if this is the order-inventory action we want to handle
    const actionId = payload.id || payload.data?.id;
    if (actionId !== "order-inventory") {
      console.log("Not an order-inventory action, ignoring");
      return;
    }

    // Use ActionData class to convert from JSON.  The factory does not throw:
    // a payload it could not read comes back with isValid === false.
    const actionData = ActionData.createFromJSON(payload as ActionDataType);

    if (!actionData.isValid) {
      console.error("Could not read the action payload:", actionData.errors);
      alert("Error processing the custom action. Please try again.");
      return;
    }

    if (actionData.warnings.length) {
      // Non-fatal adjustments, e.g. a duplicate column renamed or a short row padded.
      console.warn("Adjustments made to the action data:", actionData.warnings);
    }

    // Get column names and check if SKU column exists (case insensitive)
    if (!actionData.hasColumn("sku")) {
      // Show error message to user
      alert(
        "Error: SKU column not found in the selected data. Please ensure your data includes a SKU column.",
      );
      return;
    }

    // Extract SKU data using getDataAsTable method.  Cells are CellValue
    // (string | number | null), so drop the rows with no SKU value.
    const skus = actionData
      .getDataAsTable(["sku"])
      .map((row) => row[0])
      .filter((sku): sku is string | number => sku !== null && sku !== "");

    if (skus.length === 0) {
      alert("Error: No SKU values found in the selected data.");
      return;
    }

    // Create URL with SKU parameters
    const baseUrl = "https://tse-order-inventory.vercel.app/order";
    const skuParams = skus
      .map((sku) => `sku=${encodeURIComponent(sku)}`)
      .join("&");
    const fullUrl = `${baseUrl}?${skuParams}`;

    console.log("Opening URL:", fullUrl);

    // Open URL in new tab
    window.open(fullUrl, "_blank");
  }, []);

  return (
    // 3.1 Embed a search embed to use the custom action.
    /*
    <SearchEmbed
      ...
      onCustomAction={handleCustomAction}
    />
   */

    <>
      <p>Not yet implemented.</p>
    </>
  );
};

export default CustomAction;
