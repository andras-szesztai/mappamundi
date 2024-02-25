import { Stack } from 'expo-router';
import { View } from 'react-native';

import { CountryToFindCard } from '~/components/molecules/CountryToFindCard/CountryToFindCard';
import { FeedbackMessage } from '~/components/molecules/FeedbackMessage/FeedbackMessage';
import { Globe } from '~/components/molecules/Globe/Globe';
import { GameMachineContext } from '~/machines/gameMachine';

export default function Page() {
  return (
    <View className="relative flex flex-col flex-1">
      <Stack.Screen options={{ headerShown: false }} />
      <GameMachineContext.Provider>
        <Globe />
        <FeedbackMessage />
        <CountryToFindCard />
      </GameMachineContext.Provider>
    </View>
  );
}
