import { Text, View } from 'react-native';

import { Button } from '~/components/atoms/Button/Button';
import { GameMachineContext } from '~/machines/gameMachine';

export const CountryToFindCardContent = ({
  onStartPress,
  countryToFind,
}: {
  onStartPress: () => void;
  countryToFind: string | null;
}) => (
  <View className="absolute bottom-0 items-center justify-center w-screen gap-4 pt-8 pb-10 bg-teal-800 border-t border-teal-950">
    {countryToFind ? (
      <>
        <Text className="text-xl font-light text-teal-50">Country to find:</Text>
        <Text className="text-4xl font-medium text-teal-50">{countryToFind}</Text>
      </>
    ) : (
      <Button label="Start" onPress={onStartPress} size="lg" icon="Play" />
    )}
  </View>
);

export const CountryToFindCard = () => {
  const gameMachineRef = GameMachineContext.useActorRef();
  const countryToFind = GameMachineContext.useSelector((state) => state.context.countryToFind);
  return (
    <CountryToFindCardContent
      onStartPress={() => {
        gameMachineRef.send({ type: 'start' });
      }}
      countryToFind={countryToFind}
    />
  );
};
