/**
 * Batch convert PNG/JPEG → WebP (quality 90 = visually lossless)
 * Run: node scripts/optimize-images.mjs
 */
import sharp from "sharp";
import { readdir, stat, unlink } from "fs/promises";
import { join, extname, basename, relative } from "path";

const IMAGES_DIR = "public/images";
const QUALITY = 90;
const SKIP = new Set(["og-cover.png"]); // Keep PNG for social media

async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(p)));
    else out.push(p);
  }
  return out;
}

const allFiles = await walk(IMAGES_DIR);
const pngs = allFiles.filter(f => {
  const ext = extname(f).toLowerCase();
  return [".png", ".jpg", ".jpeg"].includes(ext) && !SKIP.has(basename(f));
});

console.log(`\n🖼️  Converting ${pngs.length} images to WebP (quality ${QUALITY})\n`);

let totalOrig = 0, totalNew = 0, ok = 0;

for (const file of pngs) {
  const webp = file.replace(/\.(png|jpe?g)$/i, ".webp");
  const rel = relative(IMAGES_DIR, file);
  try {
    const origSize = (await stat(file)).size;
    await sharp(file).webp({ quality: QUALITY }).toFile(webp);
    const newSize = (await stat(webp)).size;
    const pct = Math.round((1 - newSize / origSize) * 100);
    totalOrig += origSize;
    totalNew += newSize;
    ok++;
    console.log(`  ✅ ${rel.padEnd(52)} ${Math.round(origSize/1024)}KB → ${Math.round(newSize/1024)}KB  (-${pct}%)`);
  } catch (e) {
    console.log(`  ❌ ${rel} — ${e.message}`);
  }
}

console.log(`\n${"═".repeat(65)}`);
console.log(`  Converted: ${ok}/${pngs.length}`);
console.log(`  Total: ${(totalOrig/1024/1024).toFixed(1)}MB → ${(totalNew/1024/1024).toFixed(1)}MB  (-${Math.round((1-totalNew/totalOrig)*100)}%)`);
console.log(`${"═".repeat(65)}\n`);
