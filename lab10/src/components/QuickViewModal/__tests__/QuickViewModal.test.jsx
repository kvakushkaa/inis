import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import QuickViewModal from '../QuickViewModal';

const product = {
  id: 'ui-kit-pro',
  title: 'UI Kit Pro',
  description: 'Design system pack',
  category: 'UI KIT',
  price: 89,
  image: '',
  accent: '#0F766E',
};

describe('QuickViewModal a11y', () => {
  it('рендерит dialog с ARIA-атрибутами', () => {
    render(
      <QuickViewModal product={product} onClose={jest.fn()} onAddToCart={jest.fn()} />,
    );

    const dialog = screen.getByTestId('quick-view-dialog');
    expect(dialog).toHaveAttribute('role', 'dialog');
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(dialog).toHaveAttribute('aria-labelledby');
    expect(screen.getByRole('heading', { name: 'UI Kit Pro' })).toBeInTheDocument();
  });

  it('закрывается по Escape', async () => {
    const user = userEvent.setup();
    const onClose = jest.fn();

    render(
      <QuickViewModal product={product} onClose={onClose} onAddToCart={jest.fn()} />,
    );

    await user.keyboard('{Escape}');
    expect(onClose).toHaveBeenCalled();
  });

  it('удерживает фокус внутри модалки (focus trap)', async () => {
    const user = userEvent.setup();

    render(
      <QuickViewModal product={product} onClose={jest.fn()} onAddToCart={jest.fn()} />,
    );

    const closeBtn = screen.getByTestId('quick-view-close');
    expect(closeBtn).toHaveFocus();

    await user.tab();
    await user.tab();
    await user.tab();
    // после последнего элемента фокус возвращается к первому
    expect(closeBtn).toHaveFocus();
  });
});
