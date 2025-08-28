/**
 * Calcule la hauteur du header pour définir l'offset par défaut.
 */
export function getHeaderOffset(): number {
    const header = document.querySelector("header");
    return header instanceof HTMLElement ? header.offsetHeight : 0;
}

/**
 * Fait défiler la page jusqu'à l'élément correspondant à l'ID fourni.
 * Soustrait la hauteur du header (offset) puis applique le focus.
 */
export function scrollToId(id: string, offset: number = getHeaderOffset()): void {
    const el = document.getElementById(id);
    if (!el) return;

    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: "smooth" });

    if (el instanceof HTMLElement) {
        el.focus();
    }
}
