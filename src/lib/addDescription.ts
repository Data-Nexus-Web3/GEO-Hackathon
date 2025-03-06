import { Ipfs, Triple, Relation, type Op } from "@graphprotocol/grc-20";
import { wallet } from "../wallet";
import { submitEdit } from "./utils";

const SPACE_ID = "6iVuALVboyzNyMzDGWRAfw";
const ENTITY_ID = "PublicRecordsEntity"; // Fixed for now—use UUID4 Base58 in prod
const NAME_ATTRIBUTE_ID = "LuBWqZAu6pz54eiJS5mLv8";
const DESCRIPTION_ATTRIBUTE_ID = "LA1DqP5v6QAdsgLPXGF3YA";
const TYPES_ATTRIBUTE_ID = "Jfmby78N4BCseZinBmdVov";
const SPACE_TYPE_ID = "7gzF671tq5JTZ13naG4tnr";
const DESCRIPTION_TEXT =
  "A decentralized registry for public property records.";

// Sub-entity triples
const nameTriple: Op = Triple.make({
  attributeId: NAME_ATTRIBUTE_ID,
  entityId: ENTITY_ID,
  value: { type: "TEXT", value: "Public Records" },
});

const descriptionTriple: Op = Triple.make({
  attributeId: DESCRIPTION_ATTRIBUTE_ID,
  entityId: ENTITY_ID,
  value: { type: "TEXT", value: DESCRIPTION_TEXT },
});

const typeTriple: Op = Triple.make({
  attributeId: TYPES_ATTRIBUTE_ID,
  entityId: ENTITY_ID,
  value: { type: "TEXT", value: SPACE_TYPE_ID },
});

// Link sub-entity to space
const linkToSpace: Op = Relation.make({
  fromId: ENTITY_ID,
  toId: SPACE_ID,
  relationTypeId: "AKDxovGvZaPSWnmKnSoZJY", // Generic relation—adjust if needed
});

export async function addDescription() {
  console.log(
    "🚀 Adding Public Records entity with description in space:",
    SPACE_ID
  );

  const cid = await Ipfs.publishEdit({
    name: "Public Records Entity Description",
    author: wallet.account.address,
    ops: [nameTriple, descriptionTriple, typeTriple, linkToSpace],
  });

  console.log(`✅ Published! IPFS Hash: ${cid}`);
  await submitEdit(SPACE_ID, cid);
  console.log("✅ Public Records entity with description added!");
}
