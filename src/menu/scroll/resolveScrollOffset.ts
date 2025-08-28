/**
 * Résout l'offset de défilement à appliquer.
 * Si un offset est fourni, il est retourné directement.
 * Sinon, la hauteur de l'en-tête (classe `.header`) est utilisée si disponible.
 */
export function resolveScrollOffset(offset?: number): number {
    if (typeof offset === "number") {
        return offset;
    }
    const header = document.querySelector<HTMLElement>(".header");
    return header ? header.offsetHeight : 0;
}
