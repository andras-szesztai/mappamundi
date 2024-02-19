import { Stack } from 'expo-router';
import { Main, View, YStack } from 'tamagui';

import { Globe } from '~/components/molecules/Globe/Globe';

export default function Page() {
  return (
    <View>
      <Main>
        <Stack.Screen options={{ headerShown: false }} />
        <YStack rowGap="$10">
          <Globe />
        </YStack>
      </Main>
    </View>
  );
}
