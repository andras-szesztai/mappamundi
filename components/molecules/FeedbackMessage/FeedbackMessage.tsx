import { Text, View, SafeAreaView } from 'react-native';
import { StateValue } from 'xstate';

import { errorButtonProps, newRoundButtonProps } from './constants';

import { Button } from '~/components/atoms/Button/Button';
import { GameMachineContext } from '~/machines/gameMachine';

type ContentProps = {
  showHint: boolean;
  selectedCountry: string | null;
  onPress: (type: 'newRound' | 'retry' | 'reveal') => void;
  stateValue: StateValue;
};

export const FeedbackMessageContent = ({
  showHint,
  selectedCountry,
  onPress,
  stateValue,
}: ContentProps) => (
  <SafeAreaView className="flex">
    {showHint && (
      <View
        testID="hint"
        className="flex items-center px-4 py-2 translate-y-4 bg-yellow-600 max-w-min border-y border-y-yellow-950">
        <Text className="text-lg text-yellow-50">
          {selectedCountry ? 'Tap again to finalize selection' : 'Tap on a country to select'}
        </Text>
      </View>
    )}
    {stateValue === 'Failure' && (
      <View
        testID="failure"
        className="flex flex-col items-center justify-center gap-4 p-4 translate-y-4 border-y bg-rose-800 border-y-rose-950">
        <View>
          <Text className="text-xl text-rose-50">Incorrect, you selected {selectedCountry}</Text>
        </View>
        <View className="flex-row gap-2">
          <Button
            label="Retry"
            icon="RefreshCw"
            onPress={() => onPress('retry')}
            {...errorButtonProps}
          />
          <Button color="error" onPress={() => onPress('newRound')} {...newRoundButtonProps} />
          <Button
            label="Reveal"
            icon="Eye"
            onPress={() => onPress('reveal')}
            {...errorButtonProps}
          />
        </View>
      </View>
    )}
    {(stateValue === 'Success' || stateValue === 'Revealed') && (
      <View
        testID="success"
        className="flex flex-col items-center justify-center gap-2 p-4 px-4 py-2 translate-y-4 bg-teal-800 border-y border-y-teal-950">
        {stateValue === 'Success' && (
          <Text className="text-3xl font-medium text-teal-50">Correct!</Text>
        )}
        <Button onPress={() => onPress('newRound')} {...newRoundButtonProps} />
      </View>
    )}
  </SafeAreaView>
);

export const FeedbackMessage = () => {
  const gameMachineRef = GameMachineContext.useActorRef();
  const selectedCountry = GameMachineContext.useSelector((state) => state.context.selectedCountry);
  const stateValue = GameMachineContext.useSelector((state) => state.value);
  const currentRound = GameMachineContext.useSelector((state) => state.context.round);
  return (
    <FeedbackMessageContent
      showHint={stateValue === 'Active' && currentRound === 1}
      selectedCountry={selectedCountry}
      onPress={(type) => {
        gameMachineRef.send({ type });
      }}
      stateValue={stateValue}
    />
  );
};
