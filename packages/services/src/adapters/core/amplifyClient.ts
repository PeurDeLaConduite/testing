// src/entities/core/services/amplifyClient.ts
import "@src/amplify/setup";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@apps/amplify/data/resource";

export const client = generateClient<Schema>(); // <-- PAS d’options ici
export type { Schema } from "@apps/amplify/data/resource";
