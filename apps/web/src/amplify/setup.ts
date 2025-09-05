// src/amplify/setup.ts
import { Amplify } from "aws-amplify";
import outputs from "@apps/amplify_outputs.json";
import type { AmplifyGlobal } from "@types/web/amplify/global";

const overrides = {
    auth: {
        ...outputs.auth,
        // oauth: { domain: "auth.peur-de-la-conduite.fr" },
    },
    data: {
        ...outputs.data,
        url: "https://api.peur-de-la-conduite.fr/graphql",
    },
} as const;

const cfg = { ...outputs, ...overrides };

const globals = globalThis as AmplifyGlobal;

// Idempotence globale (dev + HMR + client/serveur)
if (!globals.__AMPLIFY_CONFIGURED__) {
    Amplify.configure(cfg, { ssr: true }); // <-- ici on balance bien cfg
    globals.__AMPLIFY_CONFIGURED__ = true;
}
