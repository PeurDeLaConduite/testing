import { z, type ZodType } from "zod";
import type { AuthorType, AuthorFormType, AuthorTypeUpdateInput } from "./types";
import { createModelForm } from "@entities/core";

export const {
    zodSchema: authorSchema,
    initialForm: initialAuthorForm,
    toForm: toAuthorForm,
    toCreate: toAuthorCreate,
    toUpdate: toAuthorUpdate,
} = createModelForm<
    AuthorType,
    AuthorFormType,
    AuthorTypeUpdateInput,
    AuthorTypeUpdateInput,
    [string[]]
>({
    zodSchema: z.object({
        authorName: z.string(),
        avatar: z.string(),
        bio: z.string(),
        email: z.string(),
        postIds: z.array(z.string()),
    }) as ZodType<AuthorFormType>,
    initialForm: {
        authorName: "",
        avatar: "",
        bio: "",
        email: "",
        postIds: [],
    },
    toForm: (author, postIds: string[] = []) => ({
        authorName: author.authorName ?? "",
        avatar: author.avatar ?? "",
        bio: author.bio ?? "",
        email: author.email ?? "",
        postIds,
    }),
    toCreate: (form: AuthorFormType): AuthorTypeUpdateInput => {
        const { postIds, ...values } = form;
        void postIds;
        return values;
    },
    toUpdate: (form: AuthorFormType): AuthorTypeUpdateInput => {
        const { postIds, ...values } = form;
        void postIds;
        return values;
    },
});
