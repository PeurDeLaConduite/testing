import type { BaseModel, CreateOmit, UpdateInput, ModelForm } from "@domain/core";
import { type SeoTypeOmit } from "@domain/customTypes/seo/types";

export type PostType = BaseModel<"Post">;
export type PostTypeOmit = CreateOmit<"Post">;
export type PostTypeUpdateInput = UpdateInput<"Post">;

type PostCustomTypes = { seo: SeoTypeOmit };
export type PostFormType = ModelForm<
    "Post",
    "comments" | "sections" | "tags" | "author",
    "tag" | "section",
    PostCustomTypes,
    "seo"
>;
