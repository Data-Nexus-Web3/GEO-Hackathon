import { Ipfs, Triple, type Op } from "@graphprotocol/grc-20";
import { wallet } from "../wallet";
import { submitEdit } from "./utils";

const HOME_SPACE_ID = "6iVuALVboyzNyMzDGWRAfw";
const NAME_ATTRIBUTE_ID = "LuBWqZAu6pz54eiJS5mLv8";
const RELATION_TYPE_ID = "3WxYoAVreE4qFhkDUs5J3q"; // Relation Type type
const NEW_RELATION_ENTITY_ID = "PropRec" + Date.now().toString(); // Temp—use UUID4 later

const nameTriple: Op = Triple.make({
  attributeId: NAME_ATTRIBUTE_ID,
  entityId: NEW_RELATION_ENTITY_ID,
  value: { type: "TEXT", value: "Property Records" },
});

const typeTriple: Op = Triple.make({
  attributeId: "Jfmby78N4BCseZinBmdVov",
  entityId: NEW_RELATION_ENTITY_ID,
  value: { type: "TEXT", value: RELATION_TYPE_ID },
});

export async function createPropertyRecordsRelation() {
  console.log("🚀 Creating Property Records Relation Type...");
  const cid = await Ipfs.publishEdit({
    name: "Create Property Records Relation Type",
    author: wallet.account.address,
    ops: [nameTriple, typeTriple],
  });
  console.log(`✅ Relation Type Published! IPFS Hash: ${cid}`);
  await submitEdit(HOME_SPACE_ID, cid);
  console.log(`✅ Created! Entity ID: ${NEW_RELATION_ENTITY_ID}`);
  return NEW_RELATION_ENTITY_ID;
}
