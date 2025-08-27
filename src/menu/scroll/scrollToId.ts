/**
 * Fait défiler la page jusqu'à l'élément correspondant à l'ID fourni.
 * Applique le focus sur l'élément une fois le scroll effectué.
 */
export function scrollToId(id: string, offset = 0): void {
    const el = document.getElementById(id);
    if (!el) return;

    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: "smooth" });

    if (el instanceof HTMLElement) {
        el.focus();
    }
}
