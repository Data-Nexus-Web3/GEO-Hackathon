import { Ipfs, Triple, type Op } from "@graphprotocol/grc-20";
import { wallet } from "../src/wallet";

// ✅ Space & Entity IDs
const PUBLIC_RECORDS_SPACE_ID = "StmAdnKcuptihSsYUobJfi"; // ✅ Your Public Records Space ID
const PROPERTY_RECORDS_ENTITY_ID = "PROPERTY-RECORDS"; // ✅ Unique ID for Property Records sub-space

// ✅ Attribute IDs (from your system)
const NAME_ATTRIBUTE = "LuBWqZAu6pz54eiJS5mLv8"; // Name field
const DESCRIPTION_ATTRIBUTE = "LA1DqP5v6QAdsgLPXGF3YA"; // Description field
const TYPES_ATTRIBUTE = "Jfmby78N4BCseZinBmdVov"; // Used to define Property Records types
const RELATION = "AKDxovGvZaPSWnmKnSoZJY"; // Used to link Property Records to Public Records

// ✅ Define Property Records Metadata
const propertyRecordsData = {
  name: "Property Records",
  description:
    "A decentralized registry for property-related records such as deeds, permits, and ownership history.",
  parentSpace: PUBLIC_RECORDS_SPACE_ID,
};

// ✅ Step 1: Define triples (data points) for Property Records
const propertyRecordsOps: Op[] = [
  // 🏛️ Name of the sub-space
  Triple.make({
    attributeId: NAME_ATTRIBUTE,
    entityId: PROPERTY_RECORDS_ENTITY_ID,
    value: { type: "TEXT", value: propertyRecordsData.name },
  }),

  // 📜 Description of the sub-space
  Triple.make({
    attributeId: DESCRIPTION_ATTRIBUTE,
    entityId: PROPERTY_RECORDS_ENTITY_ID,
    value: { type: "TEXT", value: propertyRecordsData.description },
  }),

  // 🔗 Link Property Records as a sub-Space of Public Records
  Triple.make({
    attributeId: RELATION,
    entityId: PROPERTY_RECORDS_ENTITY_ID,
    value: { type: "TEXT", value: PUBLIC_RECORDS_SPACE_ID },
  }),
];

const ipfsUrl =
  "ipfs://bafkreibsnn6tbdp52gmhrizru3b2xonlleroki3ob4mftzojwmhqtns4aq"; // ✅ Correct format

// ✅ Step 2: Publish the Property Records Sub-Space to IPFS
async function publishPropertyRecords() {
  console.log("🚀 Creating Property Records sub-space...");

  const ipfsCID = await Ipfs.publishEdit({
    name: `Create Sub-Space: ${propertyRecordsData.name}`,
    author: wallet.account.address,
    ops: propertyRecordsOps, // 🏛️ Attach all property records data
  });

  console.log(`✅ Property Records Published! IPFS Hash: ipfs://${ipfsCID}`);

  // ✅ Step 3: Request transaction calldata from Geogenesis API
  const result = await fetch(
    `https://api-testnet.grc-20.thegraph.com/space/${PUBLIC_RECORDS_SPACE_ID}/edit/calldata`, // ✅ Link to parent Space
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        cid: ipfsUrl,
        network: "TESTNET",
      }),
    }
  );

  if (!result.ok) {
    throw new Error(`❌ Failed to retrieve calldata: ${await result.text()}`);
  }

  const { to, data } = await result.json();
  console.log(`📡 Sending transaction to ${to}...`);

  // ✅ Step 4: Send transaction to finalize Property Records
  const txHash = await wallet.sendTransaction({
    to: to,
    value: 0n,
    data: data,
  });

  console.log(`✅ Property Records sub-space added! Tx Hash: ${txHash}`);
  console.log(
    `🔗 View transaction: https://explorer-geo-test-zc16z3tcvf.t.conduit.xyz/tx/${txHash}`
  );
}

// 🚀 Execute the function to publish Property Records
publishPropertyRecords();
