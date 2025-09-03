import { Project } from "ts-morph";
import path from "node:path";

const project = new Project({ tsConfigFilePath: "tsconfig.base.json" });
project.addSourceFilesAtPaths([
  "apps/**/*.{ts,tsx,js,jsx}",
  "packages/**/*.{ts,tsx,js,jsx}"
]);

const roots = [
  { dir: path.resolve("packages/types/src"), alias: "@types/" },
  { dir: path.resolve("packages/domain/src"), alias: "@domain/" },
  { dir: path.resolve("packages/services/src/app"), alias: "@services/app/" },
  { dir: path.resolve("packages/services/src/adapters"), alias: "@services/adapters/" },
  { dir: path.resolve("packages/ui/src"), alias: "@ui/" }
];

for (const sourceFile of project.getSourceFiles()) {
  for (const imp of sourceFile.getImportDeclarations()) {
    const target = imp.getModuleSpecifierSourceFile();
    if (!target) continue;
    const abs = path.resolve(target.getFilePath());
    for (const { dir, alias } of roots) {
      if (abs.startsWith(dir)) {
        const rel = path.relative(dir, abs).replace(/\\/g, "/").replace(/\.(ts|tsx|js|jsx)$/i, "");
        imp.setModuleSpecifier(alias + rel);
        break;
      }
    }
  }
}

project.saveSync();
