import { Airplay } from '@tamagui/lucide-icons';
import { Stack, Link } from 'expo-router';
import { Button, ButtonText, Main, Text, View, YStack } from 'tamagui';

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
