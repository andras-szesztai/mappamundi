import { fireEvent, render, screen } from '@testing-library/react-native';

import { CountryToFindCardContent } from './CountryToFindCard';

it('should render start button when country to find is `null`', () => {
  const onStartPress = jest.fn();
  render(<CountryToFindCardContent onStartPress={onStartPress} countryToFind={null} />);

  expect(screen.getByText('Start')).toBeTruthy();
  expect(onStartPress).toHaveBeenCalledTimes(0);

  fireEvent.press(screen.getByText('Start'));

  expect(onStartPress).toHaveBeenCalledTimes(1);
});

it('should render country to find when country to find is not `null`', () => {
  render(<CountryToFindCardContent onStartPress={jest.fn()} countryToFind="Brazil" />);

  expect(screen.getByText('Country to find:')).toBeTruthy();
  expect(screen.getByText('Brazil')).toBeTruthy();

  expect(screen.queryByText('Start')).toBeNull();
});
