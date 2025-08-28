import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
    plugins: [tsconfigPaths()],
    test: {
        environment: "jsdom",
        globals: true,
        setupFiles: "./vitest.setup.ts",
        include: [
            "__tests__/**/*.test.{ts,tsx}",
            "tests/unit/**/*.test.{ts,tsx}",
            "tests/api/**/*.test.{ts,tsx}",
        ],
    },
});
