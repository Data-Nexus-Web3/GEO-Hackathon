import { Id, Ipfs, Triple, SystemIds, Relation } from "@graphprotocol/grc-20";
import { wallet } from "../src/wallet";

const spaceId = "StmAdnKcuptihSsYUobJfi"; // Your actual Space ID
const descriptionText = "A decentralized registry for public property records.";

async function publishDescription() {
  console.log("📝 Adding description to space...");

  const descriptionTriple = Triple.make({
    attributeId: SystemIds.DESCRIPTION_ATTRIBUTE, // ✅ Custom Predicate for description
    entityId: spaceId,
    value: {
      type: "TEXT",
      value: descriptionText,
    },
  });

  // ✅ Publish to IPFS (without the invalid `options` property)
  const hash = await Ipfs.publishEdit({
    name: `Description Update for: Public Records`,
    author: wallet.account.address,
    ops: [descriptionTriple],
  });

  console.log(`✅ Description Added! IPFS Hash: ${hash}`);
}

publishDescription();
