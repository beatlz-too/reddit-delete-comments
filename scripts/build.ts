import { execSync } from "child_process"
import { readFileSync, writeFileSync } from "fs"

const minKarmaArg = process.argv.find(arg => arg.startsWith("--min-karma="))
const minKarma = minKarmaArg ? minKarmaArg.split("=")[1] : "10"

execSync(
    `bun build src/index.ts --outdir dist --target browser --define MIN_KARMA=${minKarma}`,
    { stdio: "inherit" }
)

const manifest = JSON.parse(readFileSync("manifest.json", "utf-8"))
for (const script of manifest.content_scripts ?? []) {
    script.js = script.js?.map((p: string) => p.replace(/^dist\//, ""))
}
writeFileSync("dist/manifest.json", JSON.stringify(manifest, null, 2))
console.log("manifest.json → dist/manifest.json (paths adjusted)")
