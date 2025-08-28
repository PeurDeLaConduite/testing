/**
 * ⚠️ Test d’exemple pour scrollToId. JSDOM ne fait pas défiler la page, on vérifie juste l’appel.
 * Adaptez l’import dès que `src/menu/scroll/scrollToId.ts` est présent.
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';

// import { scrollToId } from '@/menu/scroll/scrollToId';

// Stub local (à supprimer quand vous importez le vrai scrollToId)
function scrollToId(id: string, offset = 0) {
  const el = document.getElementById(id);
  if (!el) return;
  const rectTop = el.getBoundingClientRect().top;
  const top = rectTop + window.scrollY - offset;
  window.scrollTo({ top, behavior: 'smooth' });
  (el as HTMLElement).focus?.({ preventScroll: true });
}

beforeEach(() => {
  document.body.innerHTML = `<div style="height:2000px"></div><section id="target" tabindex="-1">X</section>`;
  // @ts-expect-error: inject mock
  window.scrollTo = vi.fn();
  // JSDOM getBoundingClientRect default
  const target = document.getElementById('target')!;
  target.getBoundingClientRect = () => ({ top: 300, left: 0, right: 0, bottom: 0, width: 0, height: 0, x:0, y:0, toJSON(){return{}} });
  // @ts-expect-error
  window.scrollY = 100;
});

describe('scrollToId (exemple)', () => {
  it('défile jusqu’à la bonne position (offset pris en compte)', () => {
    scrollToId('target', 64);
    expect(window.scrollTo).toHaveBeenCalledWith({ top: 300 + 100 - 64, behavior: 'smooth' });
  });
});
