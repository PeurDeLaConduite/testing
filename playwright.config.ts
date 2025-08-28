import { defineConfig, devices } from "playwright/test";

// Configuration Playwright ciblant le dossier des tests E2E
export default defineConfig({
    // Spécifie le répertoire contenant les tests end-to-end
    testDir: "./tests/e2e",
    reporter: "html",
    use: {
        baseURL: process.env.PLAYWRIGHT_BASE_URL || "http://localhost:3000",
        ...devices["Desktop Chrome"],
    },
});
