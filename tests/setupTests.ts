import "tsconfig-paths/register";
import { Amplify } from "aws-amplify";
import { beforeAll, afterEach, afterAll } from "vitest";
import { setupServer } from "msw/node";
import outputs from "@/amplify_outputs.json";
import "@testing-library/jest-dom/vitest";
import "whatwg-fetch";

/**
 * Initialisation du mock AWS Amplify et du serveur MSW pour l'ensemble des tests.
 * Ce fichier configure Amplify avec les sorties locales et démarre MSW pour intercepter les requêtes réseau.
 */
export const server = setupServer();

beforeAll(() => {
    Amplify.configure(outputs);
    server.listen();
});
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
