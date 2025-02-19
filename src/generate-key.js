import { Wallet } from "ethers";

const wallet = Wallet.createRandom();

console.log("🚀 Private Key:", wallet.privateKey);
console.log("📌 Address:", wallet.address);
console.log("🔑 Mnemonic Phrase:", wallet.mnemonic.phrase);