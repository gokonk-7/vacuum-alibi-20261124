// The Vacuum's Alibi — make.fun entry
// Writes the robot vacuum's one-line excuse to /output/entry.txt.
// No network, no secrets, no input: the line is fixed in this file.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

export const ENTRY =
  "The dust in that corner unionised at 06:00. I am in active negotiations and, per protocol, I do not cross picket lines.";

const outPath = process.env.ENTRY_OUTPUT ?? "/output/entry.txt";

function main(): void {
  const line = ENTRY.trim();
  if (line.length < 1 || line.length > 200) {
    throw new Error(`entry must be 1-200 characters, got ${line.length}`);
  }
  if (line.includes("\n")) {
    throw new Error("entry must be a single line");
  }
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, line + "\n", "utf8");
  // Second pass: read the file back and verify what the grader will see.
  const written = readFileSync(outPath, "utf8").replace(/\n$/, "");
  if (written !== line) {
    throw new Error("round-trip check failed: written entry differs from ENTRY");
  }
  console.log(`wrote ${line.length} characters to ${outPath}`);
}

main();
