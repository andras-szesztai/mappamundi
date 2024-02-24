import { Stack } from 'expo-router';
import { View } from 'react-native';

import { Message } from '~/components/atoms/Message/Message';
import { QuestionedCountry } from '~/components/atoms/QuestionedCountry/QuestionedCountry';
import { Globe } from '~/components/molecules/Globe/Globe';
import { GameMachineContext } from '~/machines/gameMachine';

export default function Page() {
  return (
    <View>
      <Stack.Screen options={{ headerShown: false }} />
      <GameMachineContext.Provider>
        <Globe />
        <Message />
        <QuestionedCountry />
      </GameMachineContext.Provider>
    </View>
  );
}
