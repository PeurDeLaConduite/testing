// eslint-plugin-internal/index.js
const path = require("path");
require("ts-node").register({ transpileOnly: true });

module.exports = {
    rules: {
        // Exemple de règle interne : "no-onclick-wrapper"
        "no-onclick-wrapper": require(
            path.resolve(__dirname, "..", "..", "eslint", "rules", "no-onclick-wrapper.ts")
        ).default,
    },

    configs: {
        recommended: {
            plugins: ["internal"],
            rules: {
                "internal/no-onclick-wrapper": "error",
            },
        },
    },
};
