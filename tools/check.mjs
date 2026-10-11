// Sanity check for the single-file game: every inline <script> must compile,
// and the page must still have the pieces the game boots from.
// Usage: node tools/check.mjs [index.html]
import { readFileSync } from 'node:fs';
import { Script } from 'node:vm';

const file = process.argv[2] ?? 'index.html';
const html = readFileSync(file, 'utf8');
const fail = msg => { console.error(`${file}: ${msg}`); process.exit(1); };

const scripts = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]);
if (!scripts.length) fail('no inline <script> found');
scripts.forEach((src, i) => {
  try { new Script(src, { filename: `${file} (script ${i + 1})` }); }
  catch (e) { fail(`script ${i + 1} does not compile\n${e.stack || e.message}`); }
});

for (const needle of ['<title>', 'id="game"', 'id="overlay"', 'id="panel"']) {
  if (!html.includes(needle)) fail(`missing ${needle}`);
}
console.log(`${file}: ${scripts.length} script(s) compile, page structure OK`);
