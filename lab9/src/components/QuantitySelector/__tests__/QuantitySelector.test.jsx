import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import QuantitySelector from '../QuantitySelector';

describe('QuantitySelector', () => {
  it('не позволяет уменьшить счётчик меньше 1', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();

    render(<QuantitySelector initialValue={1} min={1} onChange={onChange} />);

    const input = screen.getByLabelText('Количество');
    const decrement = screen.getByLabelText('Уменьшить количество');

    expect(input).toHaveValue(1);
    expect(decrement).toBeDisabled();

    await user.click(decrement);

    expect(input).toHaveValue(1);
    expect(onChange).not.toHaveBeenCalledWith(0);
  });

  it('увеличивает количество по клику на «+»', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();

    render(<QuantitySelector initialValue={1} min={1} onChange={onChange} />);

    await user.click(screen.getByLabelText('Увеличить количество'));

    expect(screen.getByLabelText('Количество')).toHaveValue(2);
    expect(onChange).toHaveBeenCalledWith(2);
  });

  it('не позволяет ввести значение меньше минимума вручную', () => {
    const onChange = jest.fn();

    render(<QuantitySelector initialValue={2} min={1} onChange={onChange} />);

    const input = screen.getByLabelText('Количество');
    fireEvent.change(input, { target: { value: '0' } });

    expect(input).toHaveValue(1);
    expect(onChange).toHaveBeenCalledWith(1);
  });
});
