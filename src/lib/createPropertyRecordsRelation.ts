import { Ipfs, Triple, Relation, type Op } from "@graphprotocol/grc-20";
import { wallet } from "../wallet";
import { submitEdit } from "./utils";

const PUBLIC_RECORDS_SPACE_ID = "6iVuALVboyzNyMzDGWRAfw";
const PROPERTY_RECORDS_ENTITY_ID = "XPZ8fnf3DvNMRDbFgxEZi2";
const NAME_ATTRIBUTE = "LuBWqZAu6pz54eiJS5mLv8";
const DESCRIPTION_ATTRIBUTE = "LA1DqP5v6QAdsgLPXGF3YA";
const RELATION_TYPE_ID = "AKDxovGvZaPSWnmKnSoZJY";

export async function createPropertyRecordsRelation() {
  console.log("🚀 Creating Property Records relation...");

  const ops: Op[] = [
    Triple.make({
      attributeId: NAME_ATTRIBUTE,
      entityId: PROPERTY_RECORDS_ENTITY_ID,
      value: { type: "TEXT", value: "Property Records" },
    }),
    Triple.make({
      attributeId: DESCRIPTION_ATTRIBUTE,
      entityId: PROPERTY_RECORDS_ENTITY_ID,
      value: { type: "TEXT", value: "A registry for property records." },
    }),
    Relation.make({
      fromId: PUBLIC_RECORDS_SPACE_ID, // Parent Space
      toId: PROPERTY_RECORDS_ENTITY_ID, // Child Entity
      relationTypeId: RELATION_TYPE_ID, // Relationship Type
      position: "CHILD", // Explicitly define the relation type
    }),
  ];

  const cid = await Ipfs.publishEdit({
    name: "Create Property Records Relation",
    author: wallet.account.address,
    ops,
  });

  await submitEdit(PUBLIC_RECORDS_SPACE_ID, `ipfs://${cid}`);
  console.log("✅ Property Records linked successfully!");
}

// 🚀 Run the function
createPropertyRecordsRelation();
