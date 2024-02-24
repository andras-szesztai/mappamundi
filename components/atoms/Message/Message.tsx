import { Pressable, SafeAreaView, Text, View } from 'react-native';

import { GameMachineContext } from '~/machines/gameMachine';

export const Message = () => {
  const gameMachineRef = GameMachineContext.useActorRef();
  const selectedCountry = GameMachineContext.useSelector((state) => state.context.selectedCountry);
  const stateValue = GameMachineContext.useSelector((state) => state.value);
  return (
    <SafeAreaView className="absolute -translate-x-1/2 left-1/2">
      {stateValue === 'Active' && (
        <View className="px-4 py-2 translate-y-4 bg-opacity-50 bg-sunglow">
          <Text className="text-lg text-raisinBlack">
            {selectedCountry
              ? 'Tap on the selected again to make a guess'
              : 'Tap on a country to select'}
          </Text>
        </View>
      )}
      {stateValue === 'Failure' && (
        <View className="flex flex-row gap-2 translate-y-4">
          <Pressable
            className="px-4 py-2 rounded-md bg-sunglow"
            onPress={() => gameMachineRef.send({ type: 'retry' })}>
            <Text className="text-xl font-medium text-raisinBlack">Retry</Text>
          </Pressable>
          <Pressable
            className="px-4 py-2 rounded-md bg-sunglow"
            onPress={() => gameMachineRef.send({ type: 'newRound' })}>
            <Text className="text-xl font-medium text-raisinBlack">New round</Text>
          </Pressable>
          <Pressable
            className="px-4 py-2 rounded-md bg-sunglow"
            onPress={() => gameMachineRef.send({ type: 'reveal' })}>
            <Text className="text-xl font-medium text-raisinBlack">Reveal</Text>
          </Pressable>
        </View>
      )}
      {stateValue === 'Success' && (
        <View className="flex flex-col gap-2 translate-y-4">
          <View className="px-4 py-2 translate-y-4 bg-opacity-50 bg-midnightGreen">
            <Text className="text-2xl font-medium text-azure">Correct!</Text>
          </View>
          <Pressable
            className="px-4 py-2 rounded-md bg-midnightGreen"
            onPress={() => gameMachineRef.send({ type: 'newRound' })}>
            <Text className="text-xl font-medium text-raisinBlack">New round?</Text>
          </Pressable>
        </View>
      )}
    </SafeAreaView>
  );
};
