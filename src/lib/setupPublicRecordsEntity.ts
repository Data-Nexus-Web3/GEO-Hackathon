import { Ipfs, Triple, Relation, type Op } from "@graphprotocol/grc-20";
import { wallet } from "../wallet";
import { submitEdit } from "./utils";

const SPACE_ID = "6iVuALVboyzNyMzDGWRAfw";
const ENTITY_ID = "PublicRecordsEntity"; // Simplified—use UUID4 Base58 in production
const NAME_ATTRIBUTE_ID = "LuBWqZAu6pz54eiJS5mLv8";
const DESCRIPTION_ATTRIBUTE_ID = "LA1DqP5v6QAdsgLPXGF3YA";
const TYPES_ATTRIBUTE_ID = "Jfmby78N4BCseZinBmdVov";
const SPACE_TYPE_ID = "7gzF671tq5JTZ13naG4tnr";
const COVER_ATTRIBUTE_ID = "7YHk6qYkNDaAtNb8GwmysF";
const IMAGE_URL =
  "ipfs://bafkreibw4q6k7vqhckx4v3hjmjavxjrfbz72m5iqx425aqn5mfkl6lrqte"; // Replace with your image
const RELATION_TYPE_ID = "3WxYoAVreE4qFhkDUs5J3q"; // Relation Type type
const PROP_REC_ENTITY_ID = "PropRec" + Date.now();
const SPACE_1_ID = "P77ioa8U9EipVASzVHBA9B";
const SPACE_2_ID = "XPZ8fnf3DvNMRDbFgxEZi2";

// Entity triples
const nameTriple: Op = Triple.make({
  attributeId: NAME_ATTRIBUTE_ID,
  entityId: ENTITY_ID,
  value: { type: "TEXT", value: "Public Records" },
});

const descriptionTriple: Op = Triple.make({
  attributeId: DESCRIPTION_ATTRIBUTE_ID,
  entityId: ENTITY_ID,
  value: {
    type: "TEXT",
    value: "A decentralized registry for public property records.",
  },
});

const typeTriple: Op = Triple.make({
  attributeId: TYPES_ATTRIBUTE_ID,
  entityId: ENTITY_ID,
  value: { type: "TEXT", value: SPACE_TYPE_ID },
});

const coverTriple: Op = Triple.make({
  attributeId: COVER_ATTRIBUTE_ID,
  entityId: ENTITY_ID,
  value: { type: "URL", value: IMAGE_URL },
});

// Property Records Relation Type
const propRecNameTriple: Op = Triple.make({
  attributeId: NAME_ATTRIBUTE_ID,
  entityId: PROP_REC_ENTITY_ID,
  value: { type: "TEXT", value: "Property Records" },
});

const propRecTypeTriple: Op = Triple.make({
  attributeId: TYPES_ATTRIBUTE_ID,
  entityId: PROP_REC_ENTITY_ID,
  value: { type: "TEXT", value: RELATION_TYPE_ID },
});

// Relations
const linkToSpace1: Op = Relation.make({
  fromId: ENTITY_ID,
  toId: SPACE_1_ID,
  relationTypeId: PROP_REC_ENTITY_ID,
});

const linkToSpace2: Op = Relation.make({
  fromId: ENTITY_ID,
  toId: SPACE_2_ID,
  relationTypeId: PROP_REC_ENTITY_ID,
});

export async function setupPublicRecordsEntity() {
  console.log("🚀 Setting up Public Records entity in space:", SPACE_ID);

  const cid = await Ipfs.publishEdit({
    name: "Setup Public Records Entity",
    author: wallet.account.address,
    ops: [
      nameTriple,
      descriptionTriple,
      typeTriple,
      coverTriple,
      propRecNameTriple,
      propRecTypeTriple,
      linkToSpace1,
      linkToSpace2,
    ],
  });

  console.log(`✅ Entity Published! IPFS Hash: ${cid}`);
  await submitEdit(SPACE_ID, cid);
  console.log("✅ Public Records entity set up with relations!");
}
