import { getChecksumAddress } from "@graphprotocol/grc-20";
import { wallet } from "../wallet"; // Adjusted from ../src/wallet
//import { propertyRecordsSchema } from "../schema"; // Adjusted from ../src/schema

export async function deployPublicRecords() {
  console.log("🚀 Deploying Public Records Space...");
  const response = await fetch(
    "https://api-testnet.grc-20.thegraph.com/deploy",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        initialEditorAddress: getChecksumAddress(wallet.account.address),
        spaceName: "Just Checking...",
        //schema: propertyRecordsSchema,
      }),
    }
  );
  if (!response.ok)
    throw new Error(`❌ Deploy failed: ${await response.text()}`);
  const { spaceId } = await response.json();
  console.log(`✅ Public Records Deployed! Space ID: ${spaceId}`);
  return spaceId;
}
deployPublicRecords();
