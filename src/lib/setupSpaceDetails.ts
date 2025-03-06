import { Ipfs, Triple, type Op } from "@graphprotocol/grc-20";
import { wallet } from "../wallet";
import { submitEdit } from "./utils";

const SPACE_ID = "6iVuALVboyzNyMzDGWRAfw";
const TYPES_ATTRIBUTE_ID = "Jfmby78N4BCseZinBmdVov"; // Types
const SPACE_TYPE_ID = "7gzF671tq5JTZ13naG4tnr"; // Space type
const COVER_ATTRIBUTE_ID = "7YHk6qYkNDaAtNb8GwmysF"; // Cover
const IMAGE_URL =
  "ipfs://bafkreibsnn6tbdp52gmhrizru3b2xonlleroki3ob4mftzojwmhqtns4aq"; // Example—replace with your image

const spaceTypeTriple: Op = Triple.make({
  attributeId: TYPES_ATTRIBUTE_ID,
  entityId: SPACE_ID,
  value: { type: "TEXT", value: SPACE_TYPE_ID },
});

const coverTriple: Op = Triple.make({
  attributeId: COVER_ATTRIBUTE_ID,
  entityId: SPACE_ID,
  value: {
    type: "URL",
    value: IMAGE_URL,
  }, // URL type for images
});

export async function setupSpaceDetails() {
  console.log("🚀 Setting up space details for:", SPACE_ID);

  const cid = await Ipfs.publishEdit({
    name: "Setup Space Details",
    author: wallet.account.address,
    ops: [spaceTypeTriple, coverTriple],
  });

  console.log(`✅ Details Published! IPFS Hash: ${cid}`);
  await submitEdit(SPACE_ID, cid);
  console.log("✅ Space details set up successfully!");
}
