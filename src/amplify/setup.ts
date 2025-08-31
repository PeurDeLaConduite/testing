// src/amplify/setup.ts
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";

// Optionnel : petits overrides *compatibles Gen2*.
// ⚠️ NE PAS introduire "Auth", "API", ni "Cognito" en majuscules ici.
const overrides = {
    // Exemple: personnaliser le Hosted UI domain si besoin (sinon laisse outputs tel quel)
    auth: {
        ...outputs.auth,
        oauth: { domain: "auth.peur-de-la-conduite.fr" }, // <-- décommente si tu as bien configuré le Hosted UI
    },

    // Exemple: pointer vers ton domaine API si c’est un alias AppSync valide
    // (sinon laisse outputs.data.url)
    data: {
        ...outputs.data,
        url: "https://api.peur-de-la-conduite.fr/graphql", // <-- uniquement si ce domaine pointe sur AppSync
    },
} as const;

const cfg = {
    ...outputs,
    ...overrides,
};

const already = (Amplify as any).getConfig?.().data?.url;
if (!already) {
    Amplify.configure(cfg, { ssr: true });
    // Debug utile :
    // console.log("[Amplify] data.url =", (Amplify as any).getConfig?.().data?.url);
}
