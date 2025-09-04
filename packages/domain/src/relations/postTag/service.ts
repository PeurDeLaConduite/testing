import { relationService } from "@domain/core";

export const postTagService = relationService("PostTag", "postId", "tagId");
