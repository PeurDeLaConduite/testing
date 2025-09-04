// src/entities/relations/sectionPost/service.ts
import { relationService } from "@domain/core";

export const sectionPostService = relationService("SectionPost", "sectionId", "postId");
