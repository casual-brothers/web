import { execSync } from "node:child_process";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { existsSync, rmSync } from "node:fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, "..");
const outDir = join(rootDir, "out");

console.log("\n🚀 Iniciando despliegue en GitHub...");
console.log("══════════════════════════════════════════════");

// 1. Compilar el proyecto estático
console.log("\n📦 Paso 1/3: Compilando Next.js estático...");
console.log("──────────────────────────────────────────────");
try {
  execSync("npm run build", { stdio: "inherit", cwd: rootDir });
  console.log("✅ ¡Compilación completada con éxito!");
} catch (err) {
  console.error("❌ La compilación falló. Corrige los errores antes de desplegar.");
  process.exit(1);
}

// 2. Preparar el repositorio local en la carpeta /out
console.log("\n📂 Paso 2/3: Preparando archivos en /out...");
console.log("──────────────────────────────────────────────");

const gitDir = join(outDir, ".git");
if (existsSync(gitDir)) {
  try {
    // Si ya existe .git en out, lo eliminamos para evitar conflictos y asegurar un despliegue limpio
    rmSync(gitDir, { recursive: true, force: true });
  } catch (err) {
    console.log("ℹ️  Limpiando configuración git previa en /out...");
  }
}

try {
  // Ejecutar inicialización de git limpio en /out
  execSync("git init", { stdio: "ignore", cwd: outDir });
  execSync("git checkout -b deploy", { stdio: "ignore", cwd: outDir });
  execSync("git remote add origin https://github.com/casual-brothers/web.git", { stdio: "ignore", cwd: outDir });
  execSync("git add -A", { stdio: "ignore", cwd: outDir });
  execSync('git commit -m "deploy: Static compiled export of Casual Brothers website"', { stdio: "ignore", cwd: outDir });
  console.log("✅ Repositorio temporal preparado con éxito en /out");
} catch (err) {
  console.error("❌ Error al preparar el repositorio de despliegue:", err.message);
  process.exit(1);
}

// 3. Empujar los cambios a GitHub
console.log("\n📤 Paso 3/3: Subiendo a la rama 'deploy' en GitHub...");
console.log("──────────────────────────────────────────────");
try {
  execSync("git push origin deploy --force", { stdio: "inherit", cwd: outDir });
  console.log("\n══════════════════════════════════════════════");
  console.log("🎉 ¡DESPLIEGUE COMPLETADO CON ÉXITO!");
  console.log("🌐 La web compilada ya está en la rama 'deploy' de GitHub.");
  console.log("══════════════════════════════════════════════\n");
} catch (err) {
  console.error("\n❌ Falló el envío a GitHub. Verifica tus permisos o conexión.");
  process.exit(1);
}
