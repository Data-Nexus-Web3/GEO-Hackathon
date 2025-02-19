import { getChecksumAddress } from "@graphprotocol/grc-20";
import { propertyRecordsSchema } from "../src/schema";
import { wallet } from "../src/wallet";

type DeploySpaceOptions = {
  initialEditorAddress: string;
  spaceName: string;
};

export async function deploySpace(options: DeploySpaceOptions) {
  console.log("🚀 Deploying Space:", options.spaceName);

  const response = await fetch(
    "https://api-testnet.grc-20.thegraph.com/deploy",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        initialEditorAddress: getChecksumAddress(options.initialEditorAddress),
        spaceName: options.spaceName,
        schema: propertyRecordsSchema, // ✅ Keep schema for structured data
      }),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`❌ Failed to deploy space: ${errorText}`);
  }

  const { spaceId } = await response.json();
  console.log(`✅ Space Deployed Successfully! Space ID: ${spaceId}`);
  return spaceId;
}

// 🚀 Deploy Space Automatically
deploySpace({
  initialEditorAddress: wallet.account.address,
  spaceName: "Public Records",
});
