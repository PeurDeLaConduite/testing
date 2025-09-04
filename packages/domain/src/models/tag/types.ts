import type { BaseModel, CreateOmit, UpdateInput, ModelForm } from "@domain/core";

export type TagType = BaseModel<"Tag">;
export type TagTypeOmit = CreateOmit<"Tag">;
export type TagTypeUpdateInput = UpdateInput<"Tag">;
export type TagFormType = ModelForm<"Tag", "posts", "post">;
