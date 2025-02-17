import { getChecksumAddress } from "@graphprotocol/grc-20";

const result = await fetch("https://api-testnet.grc-20.thegraph.com/deploy", {
  method: "POST",
  body: JSON.stringify({
    initialEditorAddress: getChecksumAddress(
      "0xA508c16666C5B8981Fa46Eb32784Fccc01942A71"
    ),
    spaceName: "Public Record",
  }),
});

const { spaceId } = await result.json();
console.log("SPACE ID", spaceId);
