import { Stack } from 'expo-router';
import { View } from 'react-native';

import { FeedbackMessage } from '~/components/molecules/FeedbackMessage/FeedbackMessage';
import { Globe } from '~/components/molecules/Globe/Globe';
import { QuestionedCountry } from '~/components/molecules/QuestionedCountry/QuestionedCountry';
import { GameMachineContext } from '~/machines/gameMachine';

export default function Page() {
  return (
    <View className="relative flex flex-col flex-1">
      <Stack.Screen options={{ headerShown: false }} />
      <GameMachineContext.Provider>
        <Globe />
        <FeedbackMessage />
        <QuestionedCountry />
      </GameMachineContext.Provider>
    </View>
  );
}
