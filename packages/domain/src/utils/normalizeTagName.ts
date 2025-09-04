export function normalizeTagName(input: string): string {
    return (input ?? "")
        .trim()
        .toLowerCase()
        .normalize("NFD")
        .replace(/\p{Diacritic}/gu, "")
        .replace(/\s+/g, " ");
}
