// src/entities/relations/sectionPost/service.ts
import { relationService } from "@services/adapters/core/relationService";

export const sectionPostService = relationService("SectionPost", "sectionId", "postId");
