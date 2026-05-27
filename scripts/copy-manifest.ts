import { readFileSync, writeFileSync } from "fs";

const manifest = JSON.parse(readFileSync("manifest.json", "utf-8"));

for (const script of manifest.content_scripts ?? []) {
  script.js = script.js?.map((p: string) => p.replace(/^dist\//, ""));
}

writeFileSync("dist/manifest.json", JSON.stringify(manifest, null, 2));
console.log("manifest.json → dist/manifest.json (paths adjusted)");
