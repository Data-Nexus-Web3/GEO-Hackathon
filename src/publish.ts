import { Ipfs, type Op } from "@graphprotocol/grc-20";
import { wallet } from "../src/wallet";

// const spaceId = "StmAdnKcuptihSsYUobJfi"; // Public Records Space ID
//const Ipfs = "bafkreifqfyucvnoylavz7g77c5g5ebcdw2qtgv3yjmwisfahaywr6l554i"; // Your actual IPFS hash

type PublishOptions = {
  spaceId: string;
  editName: string;
  author: string;
  ops: Op[];
};

export async function publish(options: PublishOptions) {
  const cid = await Ipfs.publishEdit({
    name: options.editName,
    author: options.author,
    ops: options.ops,
  });

  // ✅ Step 2: Request transaction calldata from Geogenesis API
  const result = await fetch(
    `https://api-testnet.grc-20.thegraph.com/space/${options.spaceId}/edit/calldata`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        cid: cid, // 🔥 Attach the correctly formatted IPFS hash
        network: "TESTNET",
      }),
    }
  );

  if (!result.ok) {
    throw new Error(`❌ Failed to retrieve calldata: ${await result.text()}`);
  }

  const { to, data } = await result.json();
  console.log(`📡 Sending transaction to ${to}...`);

  // ✅ Step 3: Publish to the blockchain (Send transaction)
  const txHash = await wallet.sendTransaction({
    to: to,
    value: 0n,
    data: data,
  });

  console.log(`✅ Successfully published on-chain! Tx Hash: ${txHash}`);
  console.log(
    `🔗 Check the transaction here: https://blockscout.com/gnosis/chiado/tx/${txHash}`
  );

  return await wallet.sendTransaction({
    to: to,
    value: 0n,
    data: data,
  });
}

// // 🚀 Execute the function to publish the update
// publish({
//   spaceId: spaceId,
//   editName: "Public Records Description Update",
//   author: wallet.account.address,
//   ops: [], // Provide ops here if needed
// });
