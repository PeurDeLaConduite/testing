import type { BaseModel, CreateOmit, UpdateInput, ModelForm } from "@packages/types/core";
import type { SeoTypeOmit } from "@packages/types/customTypes/seo/types";

export type SectionType = BaseModel<"Section">;
export type SectionTypeOmit = CreateOmit<"Section">;
export type SectionTypeUpdateInput = UpdateInput<"Section">;

type PostCustomType = { seo: SeoTypeOmit };

export type SectionFormType = ModelForm<"Section", "posts", "post", PostCustomType, "seo">;
