import { Ipfs, Relation, type Op } from "@graphprotocol/grc-20";
import { wallet } from "./wallet";

const PUBLIC_RECORDS_SPACE_ID = "StmAdnKcuptihSsYUobJfi";
const PROPERTY_RECORDS_TYPE_ID = "7gzF671tq5JTZ13naG4tnr";
const RELATION_TYPE_ID = "RELATION_TYPE";

const propertyRecordsRelationOp = Relation.make({
  fromId: PUBLIC_RECORDS_SPACE_ID,
  toId: PROPERTY_RECORDS_TYPE_ID,
  relationTypeId: RELATION_TYPE_ID,
});

export async function publish() {
  console.log("🚀 Linking Property Records Type to Public Records...");
  const cid = await Ipfs.publishEdit({
    name: "Link Property Records to Public Records",
    author: wallet.account.address,
    ops: [propertyRecordsRelationOp],
  });
  console.log(`✅ Relation Published! IPFS Hash: ipfs://${cid}`);
  const result = await fetch(
    `https://api-testnet.grc-20.thegraph.com/space/${PUBLIC_RECORDS_SPACE_ID}/edit/calldata`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        cid: `ipfs://${cid}`,
        network: "TESTNET",
      }),
    }
  );
  if (!result.ok)
    throw new Error(`❌ Failed to retrieve calldata: ${await result.text()}`);
  const { to, data } = await result.json();
  console.log(`📡 Sending transaction to ${to}...`);
  const txHash = await wallet.sendTransaction({
    to: to,
    value: 0n,
    data: data,
  });
  console.log(`✅ Successfully linked Property Records! Tx Hash: ${txHash}`);
}

publish();
