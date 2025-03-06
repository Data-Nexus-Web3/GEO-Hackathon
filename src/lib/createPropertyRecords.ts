import { Ipfs, Triple, Relation, type Op } from "@graphprotocol/grc-20";
import { wallet } from "../wallet";
import { submitEdit } from "./utils";

// ✅ Public Records Space ID
const PUBLIC_RECORDS_SPACE_ID = "6iVuALVboyzNyMzDGWRAfw";

// ✅ Unique Entity ID for Property Records (This is the actual entity under Public Records)
const PROPERTY_RECORDS_ENTITY_ID = "XPZ8fnf3DvNMRDbFgxEZi2";

// ✅ Attributes for Name, Description, and Relations
const RELATION_TYPE_ID = "AKDxovGvZaPSWnmKnSoZJY"; // Relation Type Attribute

export async function createPropertyRecords() {
  console.log(
    "🚀 Creating 'Property Records' and linking it to Public Records..."
  );

  const ops: Op[] = [
    // ✅ Step 1: Create 'Property Records' Entity
    Triple.make({
      attributeId: "Property Records",
      entityId: "Records for a property",
      value: { type: "TEXT", value: "Property Records" },
    }),
    // Triple.make({
    //   attributeId: DESCRIPTION_ATTRIBUTE_ID,
    //   entityId: PROPERTY_RECORDS_ENTITY_ID,
    //   value: {
    //     type: "TEXT",
    //     value: "A decentralized registry for property records.",
    //   },
    // }),

    // ✅ Step 2: Link 'Property Records' to 'Public Records' via Relation
    Relation.make({
      fromId: PUBLIC_RECORDS_SPACE_ID, // Parent (Public Records)
      toId: PROPERTY_RECORDS_ENTITY_ID, // Child (Property Records)
      relationTypeId: RELATION_TYPE_ID, // Type of relation
    }),
  ];

  // ✅ Step 3: Publish Edit to IPFS
  const cid = await Ipfs.publishEdit({
    name: "Create Property Records",
    author: wallet.account.address,
    ops,
  });

  console.log(`🔗 IPFS Hash: ipfs://${cid}`);

  // ✅ Step 4: Submit Edit to Geogenesis
  await submitEdit(PUBLIC_RECORDS_SPACE_ID, `ipfs://${cid}`);
  console.log("✅ Property Records successfully linked to Public Records!");
}

// 🚀 Run the function
createPropertyRecords();

// import {
//   ContentIds,
//   Id,
//   Ipfs,
//   Relation,
//   SystemIds,
//   Triple,
// } from "@graphprotocol/grc-20";
// import { wallet } from "../wallet";

// async function publish() {
//   //const newEntityId = Id.generate();
//   const propertyRecordsId = ContentIds.RELATED_SPACES_ATTRIBUTE;

//   const relationOp = Relation.make({
//     fromId: "6iVuALVboyzNyMzDGWRAfw",
//     toId: "XPZ8fnf3DvNMRDbFgxEZi2", //Pinellas County Building Permits
//     relationTypeId: propertyRecordsId,
//   });

//   const hash = await Ipfs.publishEdit({
//     name: "",
//     author: wallet.account.address,
//     ops: [relationOp],
//   });

//   console.log("hash", hash);
// }

// publish();
