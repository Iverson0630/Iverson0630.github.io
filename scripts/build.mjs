import { mkdir, copyFile, readFile, stat, rm } from 'node:fs/promises';
import { resolve, dirname, relative, isAbsolute } from 'node:path';
import { fileURLToPath } from 'node:url';

// Package the same static files served by GitHub Pages; no framework required.
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const output = resolve(root, 'dist');
if (dirname(output) !== root || relative(root, output) !== 'dist') {
  throw new Error('Build output must be the dist directory inside this project.');
}
const html = await readFile(resolve(root, 'index.html'), 'utf8');
const assets = new Set(['index.html', 'LICENSE.txt']);
for (const match of html.matchAll(/(?:href|src|srcset|poster)="([^"#]+)"/g)) {
  for (const candidate of match[1].split(',')) {
    const url = candidate.trim().split(/\s+/)[0];
    if (/^(?:[a-z]+:|\/\/)/i.test(url)) continue;
    assets.add(decodeURIComponent(url.split(/[?#]/)[0]));
  }
}
await rm(output, { recursive: true, force: true });
for (const asset of assets) {
  const source = resolve(root, asset);
  const rel = relative(root, source);
  if (rel.startsWith('..') || isAbsolute(rel)) throw new Error(`Asset outside project: ${asset}`);
  if (!(await stat(source)).isFile()) throw new Error(`Missing asset: ${asset}`);
  const destination = resolve(output, rel);
  await mkdir(dirname(destination), { recursive: true });
  await copyFile(source, destination);
}
console.log(`Built ${assets.size} static files in dist/.`);
