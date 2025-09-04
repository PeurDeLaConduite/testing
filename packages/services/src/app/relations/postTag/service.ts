import { relationService } from "@services/adapters/core/relationService";

export const postTagService = relationService("PostTag", "postId", "tagId");
