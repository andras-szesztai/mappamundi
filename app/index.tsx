import { Stack } from 'expo-router';
import { View } from 'react-native';

import { Globe } from '~/components/molecules/Globe/Globe';

export default function Page() {
  return (
    <View>
      <Stack.Screen options={{ headerShown: false }} />
      <View className="bg-azure">
        <Globe />
      </View>
    </View>
  );
}
