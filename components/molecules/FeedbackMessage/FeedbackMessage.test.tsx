import { fireEvent, render, screen, within } from '@testing-library/react-native';

import { FeedbackMessageContent } from './FeedbackMessage';

it('renders hint when `showHint` is true, no other states are visible', () => {
  const { rerender } = render(
    <FeedbackMessageContent showHint selectedCountry={null} onPress={jest.fn()} stateValue="Idle" />
  );

  expect(screen.getByTestId('hint')).toBeTruthy();
  expect(within(screen.getByTestId('hint')).getByText(/Tap on a country to select/i)).toBeTruthy();
  expect(screen.queryByTestId('failure')).toBeNull();
  expect(screen.queryByTestId('success')).toBeNull();

  rerender(
    <FeedbackMessageContent
      showHint
      selectedCountry="Brazil"
      onPress={jest.fn()}
      stateValue="Idle"
    />
  );

  expect(screen.getByTestId('hint')).toBeTruthy();
  expect(
    within(screen.getByTestId('hint')).getByText(/Tap again to finalize selection/i)
  ).toBeTruthy();
  expect(screen.queryByTestId('failure')).toBeNull();
  expect(screen.queryByTestId('success')).toBeNull();
});

it('renders failure when `stateValue` is "Failure", no other states are visible, `onPress` is called with correct values', () => {
  const mockPress = jest.fn();
  render(
    <FeedbackMessageContent
      showHint={false}
      selectedCountry="Brazil"
      onPress={mockPress}
      stateValue="Failure"
    />
  );

  expect(screen.getByTestId('failure')).toBeTruthy();
  expect(screen.getByText(/Incorrect, you selected Brazil/i)).toBeTruthy();
  expect(screen.queryByTestId('hint')).toBeNull();
  expect(screen.queryByTestId('success')).toBeNull();
  expect(mockPress).toHaveBeenCalledTimes(0);

  fireEvent.press(screen.getByText('Retry'));

  expect(mockPress).toHaveBeenCalledTimes(1);
  expect(mockPress).toHaveBeenCalledWith('retry');

  fireEvent.press(screen.getByText('New round'));

  expect(mockPress).toHaveBeenCalledTimes(2);
  expect(mockPress).toHaveBeenCalledWith('newRound');

  fireEvent.press(screen.getByText('Reveal'));

  expect(mockPress).toHaveBeenCalledTimes(3);
  expect(mockPress).toHaveBeenCalledWith('reveal');
});

// renders success (no other)
it('renders success when `stateValue` is "Success", no other states are visible, `onPress` is called with correct values', () => {
  const mockPress = jest.fn();
  render(
    <FeedbackMessageContent
      showHint={false}
      selectedCountry="Brazil"
      onPress={mockPress}
      stateValue="Success"
    />
  );

  expect(screen.getByTestId('success')).toBeTruthy();
  expect(screen.getByText(/Correct!/i)).toBeTruthy();
  expect(screen.queryByTestId('hint')).toBeNull();
  expect(screen.queryByTestId('failure')).toBeNull();
  expect(mockPress).toHaveBeenCalledTimes(0);

  fireEvent.press(screen.getByText('New round'));

  expect(mockPress).toHaveBeenCalledTimes(1);
  expect(mockPress).toHaveBeenCalledWith('newRound');
});

// renders revealed (no other)
it('renders revealed when `stateValue` is "Revealed", no other states are visible, `onPress` is called with correct values', () => {
  const mockPress = jest.fn();
  render(
    <FeedbackMessageContent
      showHint={false}
      selectedCountry="Brazil"
      onPress={mockPress}
      stateValue="Revealed"
    />
  );

  expect(screen.getByTestId('success')).toBeTruthy();
  expect(screen.queryByText(/Correct!/i)).toBeNull();
  expect(screen.queryByTestId('hint')).toBeNull();
  expect(screen.queryByTestId('failure')).toBeNull();
  expect(mockPress).toHaveBeenCalledTimes(0);

  fireEvent.press(screen.getByText('New round'));

  expect(mockPress).toHaveBeenCalledTimes(1);
  expect(mockPress).toHaveBeenCalledWith('newRound');
});
