// src/entities/core/services/amplifyClient.ts
import "./setup";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@types/web/amplify/schema";

export const client = generateClient<Schema>(); // <-- PAS d’options ici
export type { Schema } from "@types/web/amplify/schema";
