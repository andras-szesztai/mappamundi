import Colors from '~/constants/Colors';

export const getCountryFillColor = (
  guessedCountry: string | null,
  selectedCountry: string | null,
  countryId: string
) => {
  if (guessedCountry === countryId) return Colors.amaranth;
  if (selectedCountry === countryId) return Colors.crayola;
  return Colors.sunglow;
};
