import type {
    BaseModel,
    CreateOmit,
    UpdateInput,
    ModelForm,
} from "@types/core";
import type { SeoTypeOmit } from "@types/customTypes/seo/types";

export type SectionType = BaseModel<"Section">;
export type SectionTypeOmit = CreateOmit<"Section">;
export type SectionTypeUpdateInput = UpdateInput<"Section">;

type PostCustomType = { seo: SeoTypeOmit };

export type SectionFormType = ModelForm<"Section", "posts", "post", PostCustomType, "seo">;
