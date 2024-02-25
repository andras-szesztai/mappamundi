import { Text, View } from 'react-native';

import { Button } from '~/components/atoms/Button/Button';
import { GameMachineContext } from '~/machines/gameMachine';

export const QuestionedCountry = () => {
  const gameMachineRef = GameMachineContext.useActorRef();
  const countryToFind = GameMachineContext.useSelector((state) => state.context.countryToFind);
  const stateValue = GameMachineContext.useSelector((state) => state.value);
  const isIdle = stateValue === 'Idle';
  return (
    <View className="absolute bottom-0 items-center justify-center w-screen gap-4 pt-8 pb-10 bg-teal-800 border-t border-teal-950">
      {isIdle ? (
        <Button
          label="Start"
          onPress={() => {
            gameMachineRef.send({ type: 'start' });
          }}
          size="lg"
          icon="Play"
        />
      ) : (
        <>
          <Text className="text-xl font-light text-teal-50">Country to find:</Text>
          <Text className="text-4xl font-medium text-teal-50">{countryToFind}</Text>
        </>
      )}
    </View>
  );
};
