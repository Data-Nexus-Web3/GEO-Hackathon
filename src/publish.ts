import { Ipfs, Triple, type Op } from "@graphprotocol/grc-20";
import { wallet } from "../src/wallet";

const SPACE_ID = "StmAdnKcuptihSsYUobJfi"; // ✅ Your Public Records Space ID
const DESCRIPTION_ID = "LA1DqP5v6QAdsgLPXGF3YA"; // ✅ Correct description entity ID
const DESCRIPTION_TEXT =
  "A decentralized registry for public property records.";

// ✅ Step 1: Define the operation to add a description
const descriptionOp = Triple.make({
  attributeId: DESCRIPTION_ID,
  entityId: "W1ApQCd9TQtA3dPExNg9xE",
  value: {
    type: "TEXT",
    value: DESCRIPTION_TEXT,
  },
});

// 🔥 Use manually pinned IPFS CID (Replace with your actual CID)
const ipfsCID = "bafkreibsnn6tbdp52gmhrizru3b2xonlleroki3ob4mftzojwmhqtns4aq"; // Correct format"
const ipfsUrl =
  "ipfs://bafkreibsnn6tbdp52gmhrizru3b2xonlleroki3ob4mftzojwmhqtns4aq"; // ✅ Correct format

// ✅ Step 2: Publish the edit on Geogenesis
export async function publish() {
  console.log("🚀 Publishing description update...");

  console.log(`🔗 Using manually specified IPFS hash: ${ipfsUrl}`);

  // ✅ Step 3: Request transaction calldata from Geogenesis API
  const result = await fetch(
    `https://api-testnet.grc-20.thegraph.com/space/${SPACE_ID}/edit/calldata`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        cid: ipfsUrl, // 🔥 Attach manually pinned CID
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

// 🚀 Run the function to publish the update
publish();
