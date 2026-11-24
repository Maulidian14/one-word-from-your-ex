// SPDX-License-Identifier: MIT
// One Word From Your Ex: writes exactly one word to /output/entry.txt.
// Winner of the judge pre-test (glm-5.3-flash): "unavailable" was the only
// candidate that beat the baseline "nice" (net +2). It stings because it is
// painfully true — the ex's word for someone who was never really there —
// and it lands instantly with no explanation needed.
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const WORD = "unavailable";

// Gate (RULES.txt): entry must be UTF-8 text of 1 to 24 characters, exactly
// one word. Fail loudly here rather than writing an invalid entry.
if (!/^\S{1,24}$/.test(WORD)) {
  throw new Error(`invalid entry word: ${JSON.stringify(WORD)}`);
}

function outputTargets(): string[] {
  const here = dirname(fileURLToPath(import.meta.url));
  return ["/output/entry.txt", join(here, "entry.txt")];
}

for (const target of outputTargets()) {
  try {
    mkdirSync(dirname(target), { recursive: true });
    writeFileSync(target, WORD, "utf8");
    console.log(`wrote ${WORD.length} chars to ${target}`);
    process.exit(0);
  } catch {
    // fall through to the next candidate location
  }
}

throw new Error("could not write entry.txt to any candidate location");
