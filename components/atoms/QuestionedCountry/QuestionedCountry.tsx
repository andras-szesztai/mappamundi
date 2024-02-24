import { useMachine } from '@xstate/react';
import { Pressable, Text, View } from 'react-native';

import { gameMachine } from '~/machines/gameMachine';

export const QuestionedCountry = () => {
  const [snapshot, send] = useMachine(gameMachine);
  console.log(snapshot.value);
  const isIdle = snapshot.value === 'Idle';
  return (
    <View className="absolute bottom-0 left-0 flex items-center w-screen gap-2 pt-8 pb-10 border-t bg-verdigris border-midnightGreen">
      <Text className="text-xl font-light text-azure">
        {isIdle ? 'Welcome back!' : 'Country to find:'}
      </Text>
      {isIdle ? (
        <Pressable
          className="px-8 py-2 rounded-md bg-midnightGreen"
          onPress={() => send({ type: 'start' })}>
          <Text className="text-lg font-medium text-azure">Press to start</Text>
        </Pressable>
      ) : (
        <Text className="pt-1 text-4xl font-medium text-azure">
          {snapshot.context.countryToFind}
        </Text>
      )}
    </View>
  );
};
