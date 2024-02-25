import { Pressable, Text, View } from 'react-native';

import { GameMachineContext } from '~/machines/gameMachine';

export const QuestionedCountry = () => {
  const gameMachineRef = GameMachineContext.useActorRef();
  const countryToFind = GameMachineContext.useSelector((state) => state.context.countryToFind);
  const stateValue = GameMachineContext.useSelector((state) => state.value);
  const isIdle = stateValue === 'Idle';
  return (
    <View className="absolute bottom-0 items-center justify-center w-screen gap-2 pt-8 pb-10 bg-teal-800 border-t border-teal-950">
      {isIdle ? (
        <Pressable
          className="px-12 py-5 bg-teal-950"
          onPress={() => gameMachineRef.send({ type: 'start' })}>
          <Text className="text-2xl font-medium text-teal-50">Press to start</Text>
        </Pressable>
      ) : (
        <>
          <Text className="text-xl font-light text-teal-50">Country to find:</Text>
          <Text className="text-4xl font-medium text-teal-50">{countryToFind}</Text>
        </>
      )}
    </View>
  );
};
