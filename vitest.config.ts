import { defineConfig } from "vitest/config";
import { fileURLToPath, URL } from "node:url";

export default defineConfig({
    resolve: {
        alias: {
            "@/": fileURLToPath(new URL("./", import.meta.url)),
        },
        extensions: [".ts", ".tsx"],
    },
    test: {
        globals: true,
        environment: "jsdom",
        setupFiles: "./setupTests.ts",
        coverage: {
            reporter: ["text", "html"],
        },
    },
});
