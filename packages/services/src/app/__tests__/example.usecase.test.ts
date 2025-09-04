import { describe, expect, it, vi } from "vitest";
import { createUser } from "@packages/services/app/createUser";
import { userAdapter } from "@packages/services/adapters/userAdapter";

vi.mock("@packages/services/adapters/userAdapter", () => ({
    userAdapter: { save: vi.fn() },
}));

describe("createUser", () => {
    it("délègue la sauvegarde à l'adapter", async () => {
        const input = { name: "Ada" };
        await createUser(input);

        expect(userAdapter.save).toHaveBeenCalledWith(input);
    });
});
