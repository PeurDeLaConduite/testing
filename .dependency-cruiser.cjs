/** @type {import('dependency-cruiser').ICruiseOptions} */
module.exports = {
  forbidden: [
    { name: 'no-circular', severity: 'error', from: {}, to: { circular: true } },
    {
      name: 'no-ui-to-adapters',
      severity: 'error',
      from: { path: '^packages/ui' },
      to: { path: '^packages/services/src/adapters' }
    },
    {
      name: 'no-domain-to-io',
      severity: 'error',
      from: { path: '^packages/domain' },
      to: { path: 'react|next|aws|@aws|node-fetch|graphql' }
    }
  ],
  options: {
    tsConfig: { fileName: './tsconfig.base.json' },
    doNotFollow: { path: 'node_modules' },
    includeOnly: ['packages', 'apps/web']
  }
};
