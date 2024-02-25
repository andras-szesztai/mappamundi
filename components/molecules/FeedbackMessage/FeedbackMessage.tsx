import { Text, View, SafeAreaView } from 'react-native';

import { Button } from '~/components/atoms/Button/Button';
import { GameMachineContext } from '~/machines/gameMachine';

const errorButtonProps = {
  color: 'error',
  size: 'sm',
} as const;

export const FeedbackMessage = () => {
  const gameMachineRef = GameMachineContext.useActorRef();
  const selectedCountry = GameMachineContext.useSelector((state) => state.context.selectedCountry);
  const stateValue = GameMachineContext.useSelector((state) => state.value);
  const currentRound = GameMachineContext.useSelector((state) => state.context.round);
  const newRoundButtonProps = {
    label: 'New round',
    icon: 'SkipForward',
    onPress: () => {
      gameMachineRef.send({ type: 'newRound' });
    },
    size: 'sm',
  } as const;
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
        <View className="flex flex-col items-center justify-center gap-4 p-4 translate-y-4 border-y bg-rose-800 border-y-rose-950">
          <View>
            <Text className="text-xl text-rose-50">Incorrect, you selected {selectedCountry}</Text>
          </View>
          <View className="flex-row gap-2">
            <Button
              label="Retry"
              icon="RefreshCw"
              onPress={() => {
                gameMachineRef.send({ type: 'retry' });
              }}
              {...errorButtonProps}
            />
            <Button {...newRoundButtonProps} color="error" />
            <Button
              label="Reveal"
              icon="Eye"
              onPress={() => {
                gameMachineRef.send({ type: 'reveal' });
              }}
              {...errorButtonProps}
            />
          </View>
        </View>
      )}
      {stateValue === 'Success' && (
        <View className="flex flex-col items-center justify-center gap-2 p-4 px-4 py-2 translate-y-4 bg-teal-800 border-y border-y-teal-950">
          <Text className="text-3xl font-medium text-teal-50">Correct!</Text>
          <Button {...newRoundButtonProps} />
        </View>
      )}
      {stateValue === 'Revealed' && (
        <View className="flex flex-col items-center justify-center p-4 px-4 py-2 translate-y-4 bg-teal-800 border-y border-y-teal-950">
          <Button {...newRoundButtonProps} />
        </View>
      )}
    </SafeAreaView>
  );
};
