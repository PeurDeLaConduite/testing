import path from 'node:path';
import { Project } from 'ts-morph';

const root = path.resolve(__dirname, '..');

const project = new Project({
  tsConfigFilePath: path.join(root, 'tsconfig.base.json'),
});

project.addSourceFilesAtPaths([
  'apps/web/tests/**/*.test.ts',
  'apps/web/tests/**/*.test.tsx',
  'packages/**/tests/**/*.test.ts',
  'packages/**/src/**/*.test.ts',
  'packages/**/src/**/*.test.tsx',
]);

const mappings = [
  { match: /apps\/web\/src\/types\//, alias: '@types/' },
  { match: /apps\/web\/src\/entities\/core\/utils\//, alias: '@domain/' },
  { match: /apps\/web\/src\/entities\/core\/services\//, alias: '@services/adapters/' },
  { match: /apps\/web\/src\/services\/adapters\//, alias: '@services/adapters/' },
  { match: /apps\/web\/src\/services\//, alias: '@services/app/' },
  { match: /apps\/web\/src\/components\//, alias: '@ui/' },
];

for (const source of project.getSourceFiles()) {
  source.getImportDeclarations().forEach((imp) => {
    const spec = imp.getModuleSpecifierValue();
    if (!spec.startsWith('.')) return;

    const abs = path.normalize(path.join(path.dirname(source.getFilePath()), spec));
    let rewritten = spec;

    for (const { match, alias } of mappings) {
      if (abs.replace(/\\/g, '/').match(match)) {
        const rel = abs.replace(match, '').replace(/\\/g, '/');
        rewritten = alias + rel;
        break;
      }
    }

    rewritten = rewritten.replace(/\.(tsx?|js)$/, '');
    imp.setModuleSpecifier(rewritten);
  });
}

project.saveSync();
