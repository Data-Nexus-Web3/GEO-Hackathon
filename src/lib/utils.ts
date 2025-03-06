import { wallet } from "../wallet";

export async function submitEdit(spaceId: string, cid: string) {
  const fullCid = `ipfs://${cid}`; // Fixed from last run
  const result = await fetch(
    `https://api-testnet.grc-20.thegraph.com/space/${spaceId}/edit/calldata`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cid: fullCid, network: "TESTNET" }),
    }
  );
  if (!result.ok)
    throw new Error(`❌ Failed to retrieve calldata: ${await result.text()}`);
  const { to, data } = await result.json();
  console.log(`📡 Sending transaction to ${to}...`);
  const txHash = await wallet.sendTransaction({ to, value: 0n, data });
  console.log(`✅ Transaction sent: ${txHash}`);
  return txHash;
}
