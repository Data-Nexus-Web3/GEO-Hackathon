import { decodeEventLog, hexToString, hexToNumber } from "viem";
import { wallet } from "../src/wallet";

const TX_HASH =
  "0x052e5ecc5dc8fce21de3a9768030c7e57a10c8ff30067f07d9ceffdc6456d168";
const EXPLORER_API = `https://explorer-geo-test-zc16z3tcvf.t.conduit.xyz/api?module=transaction&action=gettxinfo&txhash=${TX_HASH}`;

async function decodeLogs() {
  console.log(`🔍 Fetching logs for transaction: ${TX_HASH}`);

  try {
    const response = await fetch(EXPLORER_API);
    if (!response.ok) {
      throw new Error(`❌ Failed to fetch logs: ${response.statusText}`);
    }

    const data = await response.json();
    console.log(`✅ Transaction Found! Decoding logs...\n`);

    // ✅ Print raw transaction data for debugging
    console.log("📜 Raw Transaction Data:", JSON.stringify(data, null, 2));

    // ✅ Extract logs if available
    if (data.result.logs && data.result.logs.length > 0) {
      console.log("\n🚀 Decoded Logs:");

      data.result.logs.forEach((log: any, index: number) => {
        console.log(`📌 Log ${index + 1}:`);
        console.log(`- Address: ${log.address}`);
        console.log(`- Topics: ${JSON.stringify(log.topics)}`);

        // Decode Event Log if possible
        try {
          const decodedData = hexToString(log.data);
          console.log(`- Decoded Data: ${decodedData}`);
        } catch (err) {
          console.log("- Raw Data (Hex):", log.data);
        }

        console.log("\n");
      });
    } else {
      console.log("⚠️ No logs found in this transaction.");
    }
  } catch (error) {
    console.error(`❌ Error fetching transaction logs:`, error);
  }
}

// 🚀 Run the function
decodeLogs();
