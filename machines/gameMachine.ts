import { assign, createMachine } from 'xstate';

import globeData from '~/assets/countries.json';
import { CountryProperties } from '~/types/countryData';

const sovereignCountries: CountryProperties[] = globeData.features
  .filter(
    (feature) => feature.properties.type === 'Sovereign country' && feature.properties.formal_en
  )
  .map((feature) => feature.properties);

const context: {
  countryToFind: string | null;
  guessedCountry: string | null;
} = { countryToFind: null, guessedCountry: null };

export const gameMachine = createMachine({
  id: 'game',
  context,
  initial: 'Idle',
  states: {
    Idle: {
      on: { start: 'NewRound' },
    },
    NewRound: {
      entry: assign({
        countryToFind: () => {
          const randomIndex = Math.floor(Math.random() * sovereignCountries.length);
          return sovereignCountries[randomIndex].name_long;
        },
      }),
      after: { 100: 'Active' },
    },
    Active: {
      on: {
        success: 'Success',
        failure: 'Failure',
      },
    },
    Success: {
      on: { restart: 'NewRound' },
    },
    Failure: {
      on: { retry: 'Active', newRound: 'NewRound', reveal: 'Revealed' },
    },
    Revealed: {
      on: { restart: 'NewRound' },
    },
  },
  on: {
    'country.guess': {
      actions: assign({
        guessedCountry: ({ event }) => event.guessedCountry,
      }),
    },
  },
});
