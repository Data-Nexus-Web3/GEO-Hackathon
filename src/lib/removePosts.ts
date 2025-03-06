import { Triple, type DeleteTripleOp } from "@graphprotocol/grc-20";
import { Ipfs } from "@graphprotocol/grc-20";
import { wallet } from "../wallet";
import { submitEdit } from "./utils";

const PUBLIC_RECORDS_SPACE_ID = "StmAdnKcuptihSsYUobJfi";
const SUSPECTED_POSTS_TYPE_ID = "7gzF671tq5JTZ13naG4tnr";

export async function removePosts() {
  console.log("🗑️ Checking for Posts or duplicate types...");
  const response = await fetch(
    `https://api-testnet.grc-20.thegraph.com/triples?space=${PUBLIC_RECORDS_SPACE_ID}`
  );
  if (!response.ok)
    throw new Error(`❌ Fetch triples failed: ${await response.text()}`);
  const triples = await response.json();

  const deleteOps: DeleteTripleOp[] = triples
    .filter(
      (t: any) =>
        t.attribute === SUSPECTED_POSTS_TYPE_ID ||
        t.value?.value?.includes("Post")
    )
    .map((t: any) =>
      Triple.remove({
        entityId: t.entity,
        attributeId: t.attribute,
      })
    );

  if (deleteOps.length === 0) {
    console.log("✅ No Posts or duplicates found.");
    return;
  }

  const cid = await Ipfs.publishEdit({
    name: "Remove Posts and Duplicates",
    author: wallet.account.address,
    ops: deleteOps,
  });
  await submitEdit(PUBLIC_RECORDS_SPACE_ID, `ipfs://${cid}`);
  console.log("✅ Posts and duplicates removed!");
}
