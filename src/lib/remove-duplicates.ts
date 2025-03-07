import { Ipfs, Triple, type Op } from "@graphprotocol/grc-20";
import { wallet } from "../wallet";
import { submitEdit } from "./utils";

const SPACE_ID = "6iVuALVboyzNyMzDGWRAfw"; // ✅ Correct Space ID
const SPACE_TYPE_ID = "7gzF671tq5JTZ13naG4tnr"; // ✅ Type ID for "space:"

async function removeDuplicateTypes() {
  console.log("🚀 Fetching existing entities...");

  // Fetch all entities in the space
  const response = await fetch(
    `https://api-testnet.grc-20.thegraph.com/space/${SPACE_ID}/entities`
  );

  if (!response.ok) {
    throw new Error(`❌ Failed to fetch entities: ${await response.text()}`);
  }

  const { entities } = await response.json();
  const duplicateOps: Op[] = [];

  // Identify duplicates based on SPACE_TYPE_ID
  entities.forEach((entity: any) => {
    if (entity.types && entity.types.includes(SPACE_TYPE_ID)) {
      console.log(`🛑 Found duplicate "space:" type in Entity: ${entity.id}`);
      duplicateOps.push(
        Triple.remove({
          entityId: entity.id,
          attributeId: SPACE_TYPE_ID, // ✅ Removed incorrect `value` field
        })
      );
    }
  });

  if (duplicateOps.length === 0) {
    console.log("✅ No duplicates found!");
    return;
  }

  console.log(`🗑️ Removing ${duplicateOps.length} duplicate "space:" types...`);

  // Publish delete operations
  const cid = await Ipfs.publishEdit({
    name: "Remove Duplicate Space Types",
    author: wallet.account.address,
    ops: duplicateOps,
  });

  await submitEdit(SPACE_ID, `ipfs://${cid}`);
  console.log("✅ Successfully removed duplicates!");
}

// 🚀 Run the function
removeDuplicateTypes();
