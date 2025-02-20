import { Ipfs, type Op } from "@graphprotocol/grc-20";
import { wallet } from "../src/wallet";

const SPACE_ID = "StmAdnKcuptihSsYUobJfi"; // ✅ Correct Space ID for API calls
const ENTITY_ID = "W1ApQCd9TQtA3dPExNg9xE"; // ✅ Public Records Entity ID
const DUPLICATE_TYPE_ID = "7gzF671tq5JTZ13naG4tnr"; // ✅ ID of the duplicate "Space:" type

async function removeDuplicateTypes() {
  console.log("🚀 Removing duplicate 'Space:' types from Entity:", ENTITY_ID);

  // ✅ Create multiple removal operations (if duplicates exist multiple times)
  const ops: Op[] = Array(5)
    .fill(0)
    .map(() => ({
      type: "DELETE_TRIPLE",
      triple: {
        entity: ENTITY_ID, // ✅ Target Public Records entity
        attribute: "has type",
        value: { type: "TEXT", value: DUPLICATE_TYPE_ID }, // 🔥 Workaround using TEXT
      },
    }));

  // ✅ Publish the removal edit to IPFS
  const cid = await Ipfs.publishEdit({
    name: "Remove Duplicate Space Types from Entity",
    author: wallet.account.address,
    ops: ops,
  });

  console.log(`✅ Removal Edit Published! IPFS Hash: ipfs://${cid}`);

  // ✅ Use `SPACE_ID` instead of `ENTITY_ID` in API call
  const result = await fetch(
    `https://api-testnet.grc-20.thegraph.com/space/${SPACE_ID}/edit/calldata`, // ✅ Corrected API endpoint
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        cid: `ipfs://${cid}`,
        network: "TESTNET",
      }),
    }
  );

  if (!result.ok) {
    throw new Error(`❌ Failed to retrieve calldata: ${await result.text()}`);
  }

  const { to, data } = await result.json();
  console.log(`📡 Sending removal transaction to ${to}...`);

  const txHash = await wallet.sendTransaction({
    to: to,
    value: 0n,
    data: data,
  });

  console.log(`✅ Successfully removed duplicates! Tx Hash: ${txHash}`);
  console.log(
    `🔗 Check the transaction here: https://explorer-geo-test-zc16z3tcvf.t.conduit.xyz/tx/${txHash}`
  );
}

// 🚀 Run the function to remove duplicates
removeDuplicateTypes();
