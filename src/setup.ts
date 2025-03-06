import { addDescription } from "./lib/addDescription";

async function setupSpace() {
  try {
    await addDescription();
    console.log("🎉 Space entity set up with description!");
  } catch (error) {
    console.error("❌ Setup failed:", error);
  }
}

setupSpace();
