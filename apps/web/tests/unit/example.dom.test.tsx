import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '@ui/button';

describe('Button', () => {
  it('déclenche le callback au clic', async () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Envoyer</Button>);

    await userEvent.click(screen.getByRole('button', { name: /envoyer/i }));
    expect(handleClick).toHaveBeenCalled();
  });
});
