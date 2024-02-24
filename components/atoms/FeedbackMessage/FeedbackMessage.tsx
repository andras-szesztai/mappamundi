import { Pressable, SafeAreaView, Text, View } from 'react-native';

import { GameMachineContext } from '~/machines/gameMachine';

export const FeedbackMessage = () => {
  const gameMachineRef = GameMachineContext.useActorRef();
  const selectedCountry = GameMachineContext.useSelector((state) => state.context.selectedCountry);
  const stateValue = GameMachineContext.useSelector((state) => state.value);
  const currentRound = GameMachineContext.useSelector((state) => state.context.round);
  return (
    <SafeAreaView className="absolute -translate-x-1/2 left-1/2">
      {stateValue === 'Active' && currentRound === 1 && (
        <View className="px-4 py-2 translate-y-4 bg-opacity-50 bg-sunglow">
          <Text className="text-lg text-raisinBlack">
            {selectedCountry
              ? 'Tap on the selected again to make a guess'
              : 'Tap on a country to select'}
          </Text>
        </View>
      )}
      {stateValue === 'Failure' && (
        <View className="flex flex-col items-center justify-center gap-2 p-4 translate-y-4 border bg-crayola border-amaranth">
          <View>
            <Text className="text-lg text-azure">Incorrect, you selected {selectedCountry}</Text>
          </View>
          <View className="flex-row gap-2">
            <Pressable
              className="px-4 py-2 bg-amaranth"
              onPress={() => gameMachineRef.send({ type: 'retry' })}>
              <Text className="text-xl font-medium text-azure">Retry</Text>
            </Pressable>
            <Pressable
              className="px-4 py-2 bg-amaranth"
              onPress={() => gameMachineRef.send({ type: 'newRound' })}>
              <Text className="text-xl font-medium text-azure">New round</Text>
            </Pressable>
            <Pressable
              className="px-4 py-2 bg-amaranth"
              onPress={() => gameMachineRef.send({ type: 'reveal' })}>
              <Text className="text-xl font-medium text-azure">Reveal</Text>
            </Pressable>
          </View>
        </View>
      )}
      {stateValue === 'Success' && (
        <View className="flex flex-col gap-2 p-4 px-4 py-2 translate-y-4 bg-opacity-50 border bg-verdigris border-midnightGreen">
          <View className="flex flex-row justify-center">
            <Text className="text-2xl font-medium text-azure">Correct!</Text>
          </View>

          <View>
            <Pressable
              className="px-4 py-2 bg-midnightGreen"
              onPress={() => gameMachineRef.send({ type: 'newRound' })}>
              <Text className="text-xl font-medium text-azure">New round</Text>
            </Pressable>
          </View>
        </View>
      )}
      {stateValue === 'Revealed' && (
        <View className="translate-y-4 ">
          <Pressable
            className="px-4 py-2 bg-midnightGreen"
            onPress={() => gameMachineRef.send({ type: 'newRound' })}>
            <Text className="text-xl font-medium text-azure">New round</Text>
          </Pressable>
        </View>
      )}
    </SafeAreaView>
  );
};
