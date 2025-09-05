// src/entities/core/types/model.ts

import type { EntityConfig } from "@packages/types/core/config";

/**
 * Modèle typé dérivé d'une configuration d'entité.
 */
export type EntityModel<C extends EntityConfig> = {
    [K in keyof C["fields"]]: unknown;
};
