import { Pressable, Text, View } from 'react-native';

import { GameMachineContext } from '~/machines/gameMachine';

export const QuestionedCountry = () => {
  const gameMachineRef = GameMachineContext.useActorRef();
  const countryToFind = GameMachineContext.useSelector((state) => state.context.countryToFind);
  const stateValue = GameMachineContext.useSelector((state) => state.value);
  const isIdle = stateValue === 'Idle';
  return (
    <View className="absolute bottom-0 left-0 flex items-center w-screen gap-2 pt-8 pb-10 border-t bg-verdigris border-midnightGreen">
      {isIdle ? (
        <Pressable
          className="px-12 py-5 rounded-md bg-midnightGreen"
          onPress={() => gameMachineRef.send({ type: 'start' })}>
          <Text className="text-2xl font-medium text-azure">Press to start</Text>
        </Pressable>
      ) : (
        <>
          <Text className="text-xl font-light text-azure">Country to find:</Text>
          <Text className="text-4xl font-medium text-azure">{countryToFind}</Text>
        </>
      )}
    </View>
  );
};
