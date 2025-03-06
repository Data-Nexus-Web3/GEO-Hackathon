import { Ipfs, Triple, type Op } from "@graphprotocol/grc-20";
import { wallet } from "../src/wallet";

const SPACE_ID = "StmAdnKcuptihSsYUobJfi"; // ✅ Public Records Space ID
const DESCRIPTION_ID = "LA1DqP5v6QAdsgLPXGF3YA"; // ✅ Correct description entity ID
const DESCRIPTION_TEXT =
  "A decentralized registry for public property records.";

// ✅ Step 1: Define the operation to add a description
const descriptionOp = Triple.make({
  attributeId: DESCRIPTION_ID,
  entityId: "W1ApQCd9TQtA3dPExNg9xE", // Ensure this is the correct entity ID
  value: {
    type: "TEXT",
    value: "A decentralized registry for public property records.",
  },
});

export async function publish() {
  const cid = await Ipfs.publishEdit({
    name: "Public Records Description",
    author: wallet.account.address,
    ops: [descriptionOp], // ✅ Pass the description operation
  });

  // ✅ Step 3: Request transaction calldata from Geogenesis API
  const result = await fetch(
    `https://api-testnet.grc-20.thegraph.com/space/${SPACE_ID}/edit/calldata`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        cid: cid, // 🔥 Attach dynamically generated IPFS CID
        network: "TESTNET",
      }),
    }
  );

  if (!result.ok) {
    throw new Error(`❌ Failed to retrieve calldata: ${await result.text()}`);
  }

  const { to, data } = await result.json();
  console.log(`📡 Sending transaction to ${to}...`);

  // ✅ Step 4: Send the transaction on-chain
  const txHash = await wallet.sendTransaction({
    to: to,
    value: 0n,
    data: data,
  });

  console.log(`✅ Successfully published on-chain! Tx Hash: ${txHash}`);
  console.log(
    `🔗 Check the transaction here: https://explorer-geo-test-zc16z3tcvf.t.conduit.xyz/tx/${txHash}`
  );
}
