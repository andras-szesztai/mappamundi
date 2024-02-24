import { Stack } from 'expo-router';
import { View } from 'react-native';

import { FeedbackMessage } from '~/components/atoms/FeedbackMessage/FeedbackMessage';
import { QuestionedCountry } from '~/components/atoms/QuestionedCountry/QuestionedCountry';
import { Globe } from '~/components/molecules/Globe/Globe';
import { GameMachineContext } from '~/machines/gameMachine';

export default function Page() {
  return (
    <View>
      <Stack.Screen options={{ headerShown: false }} />
      <GameMachineContext.Provider>
        <Globe />
        <FeedbackMessage />
        <QuestionedCountry />
      </GameMachineContext.Provider>
    </View>
  );
}
