import { createActorContext } from '@xstate/react';
import { assign, createMachine } from 'xstate';

import globeData from '~/assets/countries.json';
import { CountryProperties } from '~/types/countryData';

const sovereignCountries: CountryProperties[] = globeData.features
  .filter(
    (feature) => feature.properties.type === 'Sovereign country' && feature.properties.name_long
  )
  .map((feature) => feature.properties);

const context: {
  countryToFind: string | null;
  selectedCountry: string | null;
  guessedCountry: string | null;
  round: number;
} = { countryToFind: null, selectedCountry: null, guessedCountry: null, round: 0 };

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
        countryToFind: () =>
          sovereignCountries[Math.floor(Math.random() * sovereignCountries.length)].name_long,
        selectedCountry: null,
        guessedCountry: null,
        round: ({ context }) => context.round + 1,
      }),
      after: { 100: 'Active' },
    },
    Active: {
      entry: assign({
        selectedCountry: null,
        guessedCountry: null,
      }),
      on: {
        success: 'Success',
        failure: 'Failure',
      },
      exit: assign({
        guessedCountry: ({ context }) => context.selectedCountry,
      }),
    },
    Success: {
      on: { newRound: 'NewRound' },
    },
    Failure: {
      on: { retry: 'Active', newRound: 'NewRound', reveal: 'Revealed' },
    },
    Revealed: {
      entry: assign({
        selectedCountry: null,
        guessedCountry: null,
      }),
      on: { newRound: 'NewRound' },
    },
  },
  on: {
    'country.select': {
      actions: assign({
        selectedCountry: ({ event }) => event.selectedCountry,
      }),
    },
  },
});

export const GameMachineContext = createActorContext(gameMachine);
