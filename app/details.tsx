import { Feather } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import React from 'react';
import { Button, Main, Text, View, YStack } from 'tamagui';

export default function Details() {
  const router = useRouter();

  const BackButton = () => (
    <Button
      unstyled
      flexDirection="row"
      backgroundColor="transparent"
      paddingLeft={0}
      pressStyle={{ opacity: 0.5 }}
      onPress={router.back}
      icon={<Feather name="chevron-left" size={16} color="#007AFF" />}>
      <Text color="#007AFF">Back</Text>
    </Button>
  );

  return (
    <View>
      <Stack.Screen options={{ title: 'Details', headerLeft: BackButton }} />
      <Main>
        <YStack>
          <Text>Details</Text>
        </YStack>
      </Main>
    </View>
  );
}
