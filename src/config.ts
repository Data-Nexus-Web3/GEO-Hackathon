import dotenv from "dotenv";

dotenv.config();

const PK = process.env.PK;
if (!PK) {
  throw new Error(
    "❌ PK does not exist in environment. Please check your .env file."
  );
}

const RPC = process.env.RPC;
if (!RPC) {
  throw new Error(
    "❌ RPC does not exist in environment. Please check your .env file."
  );
}

console.log("✅ Config Loaded Successfully.");

export const config = {
  pk: PK,
  rpc: RPC,
};
