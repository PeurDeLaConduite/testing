import type { BaseModel, CreateOmit, UpdateInput, ModelForm } from "@entities/core";

export type UserNameType = BaseModel<"UserName">;
export type UserNameTypeOmit = CreateOmit<"UserName">;
export type UserNameTypeUpdateInput = UpdateInput<"UserName">;
export type UserNameFormType = ModelForm<"UserName", "comments", "comments" | "postComments">;
export type UserNameMinimalType = { userName: string };
