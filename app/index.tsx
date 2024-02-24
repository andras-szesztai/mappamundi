import { Stack } from 'expo-router';
import { View } from 'react-native';

import { QuestionedCountry } from '~/components/atoms/QuestionedCountry/QuestionedCountry';
import { Globe } from '~/components/molecules/Globe/Globe';

export default function Page() {
  return (
    <View>
      <Stack.Screen options={{ headerShown: false }} />
      <View>
        <Globe />
      </View>
      <QuestionedCountry />
    </View>
  );
}
