import { Airplay } from '@tamagui/lucide-icons';
import { Stack, Link } from 'expo-router';
import { Button, ButtonText, Main, Text, View, YStack } from 'tamagui';

export default function Page() {
  return (
    <View>
      <Main>
        <Stack.Screen options={{ title: 'Overview' }} />
        <YStack>
          <Text>Hello World</Text>
        </YStack>
        <Link href={{ pathname: '/details', params: { name: 'Dan' } }} asChild>
          <Button alignSelf="center" icon={Airplay} size="$6">
            <ButtonText>Large</ButtonText>
          </Button>
        </Link>
      </Main>
    </View>
  );
}
