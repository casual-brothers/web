/**
 * deploy.mjs — Build & upload estático por FTP
 *
 * Uso:
 *   npm run deploy          → build + subir a FTP
 *   npm run deploy:upload   → solo subir (sin rebuild)
 *
 * Configuración en .env.local (gitignored):
 *   FTP_HOST, FTP_USER, FTP_PASS, FTP_REMOTE_DIR
 */

import { readdir, stat } from "node:fs/promises";
import { join, relative, posix, dirname } from "node:path";
import { execSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";
import { Client } from "basic-ftp";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, "..", ".env.local") });

// ── Config ──────────────────────────────────────────
const HOST = process.env.FTP_HOST;
const USER = process.env.FTP_USER;
const PASS = process.env.FTP_PASS;
const REMOTE_DIR = process.env.FTP_REMOTE_DIR || "/newweb";
const LOCAL_DIR = join(__dirname, "..", "out");
const SKIP_BUILD = process.argv.includes("--skip-build");
const MAX_RETRIES = 3;

if (!HOST || !USER || !PASS) {
  console.error("❌ Faltan credenciales FTP en .env.local");
  console.error("   Necesitas: FTP_HOST, FTP_USER, FTP_PASS");
  process.exit(1);
}

// ── FTP Connection Manager ──────────────────────────
async function createFtpClient() {
  const client = new Client();
  client.ftp.verbose = false;

  // Try TLS first, fallback to plain FTP
  try {
    await client.access({
      host: HOST,
      user: USER,
      password: PASS,
      secure: true,
      secureOptions: { rejectUnauthorized: false },
    });
  } catch {
    await client.access({
      host: HOST,
      user: USER,
      password: PASS,
      secure: false,
    });
  }

  return client;
}

// ── Collect all files first ─────────────────────────
async function collectFiles(localPath, remotePath) {
  const files = [];
  const entries = await readdir(localPath, { withFileTypes: true });

  for (const entry of entries) {
    const localEntryPath = join(localPath, entry.name);
    const remoteEntryPath = posix.join(remotePath, entry.name);

    if (entry.isDirectory()) {
      const subFiles = await collectFiles(localEntryPath, remoteEntryPath);
      files.push(...subFiles);
    } else {
      const fileStat = await stat(localEntryPath);
      files.push({
        local: localEntryPath,
        remote: remoteEntryPath,
        size: fileStat.size,
        relPath: relative(LOCAL_DIR, localEntryPath),
      });
    }
  }

  return files;
}

// ── Upload with retry & reconnection ────────────────
async function uploadWithRetry(files) {
  let client = await createFtpClient();
  console.log("  ✅ Conectado al servidor FTP");

  let uploaded = 0;
  let skipped = 0;
  const total = files.length;
  const createdDirs = new Set();

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const dir = posix.dirname(file.remote);

    // Ensure directory exists
    if (!createdDirs.has(dir)) {
      let dirRetries = 0;
      while (dirRetries < MAX_RETRIES) {
        try {
          await client.ensureDir(dir);
          await client.cd("/"); // Reset to root after ensureDir
          createdDirs.add(dir);
          break;
        } catch (err) {
          dirRetries++;
          if (dirRetries >= MAX_RETRIES) throw err;
          console.log(`\n  🔄 Reconectando... (dir: intento ${dirRetries}/${MAX_RETRIES})`);
          try { client.close(); } catch { /* ignore */ }
          await sleep(2000 * dirRetries);
          client = await createFtpClient();
        }
      }
    }

    // Upload file with retry
    let retries = 0;
    while (retries < MAX_RETRIES) {
      try {
        await client.uploadFrom(file.local, file.remote);
        uploaded++;
        const pct = Math.round((uploaded / total) * 100);
        const sizeMB = (file.size / 1024 / 1024).toFixed(2);
        process.stdout.write(
          `\r  📤 [${pct}%] ${uploaded}/${total} — ${file.relPath} (${sizeMB} MB)          `
        );
        break;
      } catch (err) {
        retries++;
        if (retries >= MAX_RETRIES) {
          console.error(`\n  ❌ Falló después de ${MAX_RETRIES} intentos: ${file.relPath}`);
          throw err;
        }
        console.log(`\n  🔄 Reconectando... (archivo: intento ${retries}/${MAX_RETRIES})`);
        try { client.close(); } catch { /* ignore */ }
        await sleep(2000 * retries);
        client = await createFtpClient();
      }
    }
  }

  client.close();
  return { uploaded, skipped };
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// ── Main ────────────────────────────────────────────
async function main() {
  console.log("");
  console.log("🚀 Casual Brothers — Deploy");
  console.log("═══════════════════════════════════════");

  // 1. Build
  if (!SKIP_BUILD) {
    console.log("");
    console.log("📦 Paso 1/2: Building...");
    console.log("─────────────────────────────────────");
    try {
      execSync("npm run build", {
        stdio: "inherit",
        cwd: join(__dirname, ".."),
      });
    } catch {
      console.error("❌ Build falló. Corrige los errores antes de hacer deploy.");
      process.exit(1);
    }
  } else {
    console.log("");
    console.log("⏭️  Build omitido (--skip-build)");
  }

  // 2. Collect files
  console.log("");
  console.log("📤 Paso 2/2: Subiendo por FTP...");
  console.log("─────────────────────────────────────");
  console.log(`   Servidor: ${HOST}`);
  console.log(`   Destino:  ${REMOTE_DIR}/`);
  console.log("");
  console.log("  📂 Recopilando archivos...");

  const files = await collectFiles(LOCAL_DIR, REMOTE_DIR);
  const totalSizeMB = (files.reduce((sum, f) => sum + f.size, 0) / 1024 / 1024).toFixed(1);
  console.log(`  📊 ${files.length} archivos (${totalSizeMB} MB total)`);
  console.log("");

  // 3. Upload
  try {
    const startTime = Date.now();
    const { uploaded } = await uploadWithRetry(files);
    const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);

    console.log("");
    console.log("");
    console.log("═══════════════════════════════════════");
    console.log(`✅ ¡Deploy completado en ${elapsed}s!`);
    console.log(`   ${uploaded} archivos subidos`);
    console.log(`   🌐 https://casualbrothers.com${REMOTE_DIR}/`);
    console.log("═══════════════════════════════════════");
    console.log("");
  } catch (err) {
    console.error("");
    console.error("❌ Error de FTP:", err.message);

    if (err.message.includes("ENOTFOUND")) {
      console.error("   → No se encontró el servidor. ¿Tienes conexión a internet?");
    } else if (err.message.includes("530") || err.message.includes("Login")) {
      console.error("   → Credenciales incorrectas. Revisa .env.local");
    } else if (err.message.includes("ETIMEOUT")) {
      console.error("   → Timeout de conexión. Prueba de nuevo.");
    }

    process.exit(1);
  }
}

main();
