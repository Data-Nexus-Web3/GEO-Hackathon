import create from "ipfs-http-client"; // Switch to named import
import { Ipfs, Triple, Relation, type Op } from "@graphprotocol/grc-20";
import { getChecksumAddress } from "@graphprotocol/grc-20";
import { wallet } from "../wallet";
import { propertyRecordsSchema } from "../schema";
import { submitEdit } from "./utils";

const ipfs = create({ host: "ipfs.infura.io", port: 5001, protocol: "https" }); // Use create
const PROPERTY_DEEDS_SPACE_ID = "PinellasCountyDeeds";
const PROPERTY_RECORDS_ENTITY_ID = "PROPERTY-RECORDS";
const NAME_ATTRIBUTE = "LuBWqZAu6pz54eiJS5mLv8";
const DESCRIPTION_ATTRIBUTE = "LA1DqP5v6QAdsgLPXGF3YA";
const TYPES_ATTRIBUTE = "Jfmby78N4BCseZinBmdVov";
const RELATION_ATTRIBUTE = "AKDxovGvZaPSWnmKnSoZJY";

export async function deployPropertyDeeds() {
  console.log("🚀 Deploying Property Deeds Space...");
  const response = await fetch(
    "https://api-testnet.grc-20.thegraph.com/deploy",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        initialEditorAddress: getChecksumAddress(wallet.account.address),
        spaceName: "Property Deeds",
        schema: propertyRecordsSchema,
      }),
    }
  );
  if (!response.ok)
    throw new Error(`❌ Deploy failed: ${await response.text()}`);
  const { spaceId } = await response.json();
  console.log(`✅ Property Deeds Deployed! Space ID: ${spaceId}`);

  const deedData = {
    parcelId: "123-456-789",
    owner: "Jane Doe",
    recordNumber: "PD-001",
    status: "Active",
    submissionDate: "2025-02-24",
  };
  const ipfsCid = await ipfs.add(JSON.stringify(deedData));
  const deedOps: Op[] = [
    Triple.make({
      attributeId: NAME_ATTRIBUTE,
      entityId: "DEED-001",
      value: { type: "TEXT", value: `Deed ${deedData.parcelId}` },
    }),
    Triple.make({
      attributeId: DESCRIPTION_ATTRIBUTE,
      entityId: "DEED-001",
      value: { type: "TEXT", value: `IPFS: ${ipfsCid.path}` },
    }),
    Triple.make({
      attributeId: TYPES_ATTRIBUTE,
      entityId: "DEED-001",
      value: { type: "TEXT", value: "PropertyDeed" },
    }),
  ];

  const deedCid = await Ipfs.publishEdit({
    name: "Add Pinellas County Deed",
    author: wallet.account.address,
    ops: deedOps,
  });
  await submitEdit(PROPERTY_DEEDS_SPACE_ID, `ipfs://${deedCid}`);
  console.log("✅ Sample deed added with IPFS data!");

  const linkOps: Op[] = [
    Relation.make({
      fromId: PROPERTY_RECORDS_ENTITY_ID,
      toId: PROPERTY_DEEDS_SPACE_ID,
      relationTypeId: RELATION_ATTRIBUTE,
    }),
  ];
  const linkCid = await Ipfs.publishEdit({
    name: "Link Property Deeds",
    author: wallet.account.address,
    ops: linkOps,
  });
  await submitEdit(PROPERTY_DEEDS_SPACE_ID, `ipfs://${linkCid}`);
  console.log("✅ Property Deeds linked to Property Records!");
}
