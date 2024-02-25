import { Pressable, Text, View, SafeAreaView } from 'react-native';

import { GameMachineContext } from '~/machines/gameMachine';

export const FeedbackMessage = () => {
  const gameMachineRef = GameMachineContext.useActorRef();
  const selectedCountry = GameMachineContext.useSelector((state) => state.context.selectedCountry);
  const stateValue = GameMachineContext.useSelector((state) => state.value);
  const currentRound = GameMachineContext.useSelector((state) => state.context.round);
  return (
    <SafeAreaView className="flex">
      {stateValue === 'Active' && currentRound === 1 && (
        <View className="flex items-center px-4 py-2 translate-y-4 bg-yellow-600 max-w-min border-y border-y-yellow-950">
          <Text className="text-lg text-yellow-50">
            {selectedCountry ? 'Tap again to finalize selection' : 'Tap on a country to select'}
          </Text>
        </View>
      )}
      {stateValue === 'Failure' && (
        <View className="flex flex-col items-center justify-center gap-2 p-4 translate-y-4 border-y bg-rose-800 border-y-rose-950">
          <View>
            <Text className="text-lg text-rose-50">Incorrect, you selected {selectedCountry}</Text>
          </View>
          <View className="flex-row gap-2">
            <Pressable
              className="px-4 py-2 bg-rose-950"
              onPress={() => gameMachineRef.send({ type: 'retry' })}>
              <Text className="text-xl font-medium text-rose-50">Retry</Text>
            </Pressable>
            <Pressable
              className="px-4 py-2 bg-rose-950"
              onPress={() => gameMachineRef.send({ type: 'newRound' })}>
              <Text className="text-xl font-medium text-rose-50">New round</Text>
            </Pressable>
            <Pressable
              className="px-4 py-2 bg-rose-950"
              onPress={() => gameMachineRef.send({ type: 'reveal' })}>
              <Text className="text-xl font-medium text-rose-50">Reveal</Text>
            </Pressable>
          </View>
        </View>
      )}
      {stateValue === 'Success' && (
        <View className="flex flex-col items-center justify-center gap-2 p-4 px-4 py-2 translate-y-4 bg-teal-800 border-y border-y-teal-950">
          <Text className="text-2xl font-medium text-teal-50">Correct!</Text>
          <Pressable
            className="px-4 py-2 bg-teal-950 "
            onPress={() => gameMachineRef.send({ type: 'newRound' })}>
            <Text className="text-xl font-medium text-teal-50">New round</Text>
          </Pressable>
        </View>
      )}
      {stateValue === 'Revealed' && (
        <View className="flex flex-col items-center justify-center gap-2 p-4 px-4 py-2 translate-y-4 bg-teal-800 border-y border-y-teal-950">
          <Pressable
            className="px-4 py-2 bg-teal-950"
            onPress={() => gameMachineRef.send({ type: 'newRound' })}>
            <Text className="text-xl font-medium text-teal-50">New round</Text>
          </Pressable>
        </View>
      )}
    </SafeAreaView>
  );
};
