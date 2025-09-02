import eslintPluginImport from "eslint-plugin-import";

export default [
    {
        ignores: ["node_modules/**"],
        rules: {
            "import/no-restricted-paths": [
                "error",
                {
                    zones: [
                        { target: "./packages/domain", from: "./packages/services" },
                        { target: "./packages/domain", from: "./packages/ui" },
                        { target: "./packages/services", from: "./packages/ui" },
                    ],
                },
            ],
        },
    },
    eslintPluginImport.configs.recommended,
];
