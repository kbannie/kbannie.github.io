import { cp, mkdir, readdir, readFile, rm, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const sourceRoot = fileURLToPath(new URL('../', import.meta.url));
const repoRoot = path.resolve(sourceRoot, '..');
const outputRoot = path.join(sourceRoot, 'dist/client');
const manifestPath = path.join(repoRoot, '.pages-generated.json');

async function filesUnder(dir, prefix = '') {
  const files = [];
  for (const item of await readdir(dir, { withFileTypes: true })) {
    const relative = path.posix.join(prefix, item.name);
    if (item.isDirectory()) files.push(...await filesUnder(path.join(dir, item.name), relative));
    else if (item.isFile()) files.push(relative);
    else throw new Error(`Unexpected non-file entry in export: ${relative}`);
  }
  return files;
}

function generatedPath(relative) {
  if (path.isAbsolute(relative) || relative.split('/').some(part => part === '..' || part === '.git' || part === 'site-source')) {
    throw new Error(`Unsafe generated path: ${relative}`);
  }
  return path.join(repoRoot, relative);
}

const files = await filesUnder(outputRoot);
if (!files.includes('index.html')) throw new Error('Static export is missing index.html');
const html = await readFile(path.join(outputRoot, 'index.html'), 'utf8');
if (!html.includes('Kabeen Kim') || !html.includes('https://kbannie.github.io')) {
  throw new Error('Static homepage content or canonical URL is missing');
}

let previous = [];
try { previous = JSON.parse(await readFile(manifestPath, 'utf8')); }
catch (error) { if (error.code !== 'ENOENT') throw error; }

for (const file of previous) {
  if (!files.includes(file)) await rm(generatedPath(file), { force: true });
}
for (const file of files) {
  const target = generatedPath(file);
  await mkdir(path.dirname(target), { recursive: true });
  await cp(path.join(outputRoot, file), target);
}
await writeFile(path.join(repoRoot, '.nojekyll'), '');
await writeFile(manifestPath, JSON.stringify(files, null, 2) + '\n');
console.log(`Published ${files.length} static files to the repository root.`);
