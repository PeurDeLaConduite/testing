import { relationService } from "@packages/services/adapters/core/relationService";

export const postTagService = relationService("PostTag", "postId", "tagId");
