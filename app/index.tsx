import { Stack } from 'expo-router';
import { Main, View } from 'tamagui';

import { Globe } from '~/components/molecules/Globe/Globe';
import Colors from '~/constants/Colors';

export default function Page() {
  return (
    <View>
      <Main>
        <Stack.Screen options={{ headerShown: false }} />
        <View backgroundColor={Colors.azure}>
          <Globe />
        </View>
      </Main>
    </View>
  );
}
