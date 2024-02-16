import { Stack } from 'expo-router';
import { Main, Text, View, YStack } from 'tamagui';

export default function NotFoundScreen() {
  return (
    <View>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <Main>
        <YStack gap="$-10">
          <Text>This screen doesn't exist.</Text>
        </YStack>
      </Main>
    </View>
  );
}
