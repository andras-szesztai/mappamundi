import { fireEvent, render, screen } from '@testing-library/react-native';

import { Button } from './Button';

it('renders with correct label and calls `onPress`', () => {
  const label = 'Click';
  const mockPress = jest.fn();
  render(<Button onPress={mockPress} icon="ArrowRight" label={label} />);

  expect(mockPress).not.toHaveBeenCalled();
  expect(screen.getByText(label)).toBeTruthy();

  fireEvent.press(screen.getByText(label));

  expect(mockPress).toHaveBeenCalledTimes(1);
});
