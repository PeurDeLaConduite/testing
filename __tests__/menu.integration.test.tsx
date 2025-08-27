/**
 * ⚠️ Test d’intégration d’exemple. Remplacez le composant Dummy par votre composant réel.
 * Objectif: vérifier le dispatch d’action et le respect du feature flag.
 */
import { describe, it, expect, vi } from 'vitest';
import * as React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

type MenuItem = { id:string; title:string; class:string; path?:string; AnchorId?:string; subItems?:MenuItem[]; };
type Action =
  | { kind:'href'; href:string }
  | { kind:'hash'; targetId:string }
  | { kind:'toggle'; itemId:string };

// Squelettes d’exemple — à remplacer par vos vrais modules
function toAction(it: MenuItem): Action {
  if (it.subItems?.length) return { kind:'toggle', itemId: it.id };
  if (it.path && it.AnchorId) return { kind:'href', href:`${it.path}${it.AnchorId}` };
  if (it.AnchorId) return { kind:'hash', targetId: it.AnchorId.replace(/^#/, '') };
  if (it.path) return { kind:'href', href: it.path };
  return { kind:'toggle', itemId: it.id };
}
const dispatchAction = vi.fn();

function DummyLink({ item, useV2 }: { item: MenuItem; useV2: boolean }) {
  const onClick = () => {
    if (!useV2) return; // legacy noop ici pour l'exemple
    const a = toAction(item);
    // @ts-ignore
    dispatchAction(a, {}, 64);
  };
  return <button onClick={onClick}>{item.title}</button>;
}

describe('intégration minimale (exemple)', () => {
  it('clic item path+AnchorId → dispatch href "/page#x"', () => {
    dispatchAction.mockReset();
    const item: MenuItem = { id:'i', title:'Go', class:'', path:'/page', AnchorId:'#x' };
    render(<DummyLink item={item} useV2={true} />);
    fireEvent.click(screen.getByText('Go'));
    expect(dispatchAction).toHaveBeenCalledWith({ kind:'href', href:'/page#x' }, {}, 64);
  });
});
