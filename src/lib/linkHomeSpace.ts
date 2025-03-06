import { Ipfs, Relation, type Op } from "@graphprotocol/grc-20";
import { wallet } from "../wallet";
import { submitEdit } from "./utils";

const HOME_SPACE_ID = "6iVuALVboyzNyMzDGWRAfw";
const SPACE_1_ID = "P77ioa8U9EipVASzVHBA9B";
const SPACE_2_ID = "XPZ8fnf3DvNMRDbFgxEZi2";

export async function linkHomeSpace(relationTypeId: string) {
  console.log(`🚀 Linking ${HOME_SPACE_ID} with Property Records...`);
  const relationToSpace1: Op = Relation.make({
    fromId: HOME_SPACE_ID,
    toId: SPACE_1_ID,
    relationTypeId: relationTypeId,
  });
  const relationToSpace2: Op = Relation.make({
    fromId: HOME_SPACE_ID,
    toId: SPACE_2_ID,
    relationTypeId: relationTypeId,
  });
  const cid = await Ipfs.publishEdit({
    name: "Link Home Space with Property Records",
    author: wallet.account.address,
    ops: [relationToSpace1, relationToSpace2],
  });
  console.log(`✅ Relations Published! IPFS Hash: ${cid}`);
  await submitEdit(HOME_SPACE_ID, cid);
  console.log("✅ Linked successfully!");
}
