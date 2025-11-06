/* At build time, dynamically figure out how many placeholder images we have */
import fs from "fs";
const count = fs.readdirSync("./public/placeholders").length;
fs.writeFileSync("./public/placeholders/count.json", JSON.stringify({ count }));
