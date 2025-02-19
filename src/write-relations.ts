import {
  ContentIds,
  Id,
  Ipfs,
  Relation,
  SystemIds,
  Triple,
} from "@graphprotocol/grc-20";
import { wallet } from "../src/wallet";

async function publishRelation(deedId: string, roleId: string) {
  const rolesPropertyId = ContentIds.ROLES_ATTRIBUTE;

  const relationOp = Relation.make({
    fromId: deedId,
    toId: roleId,
    relationTypeId: rolesPropertyId,
  });

  const hash = await Ipfs.publishEdit({
    name: "Assign Role",
    author: wallet.account.address,
    ops: [relationOp],
  });

  console.log(`✅ Relation Published: ${hash}`);
}

publishRelation("", ""); // Byron - Roles -> Software Engineer
