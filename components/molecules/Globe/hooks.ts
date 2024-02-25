import { Camera } from '@rnmapbox/maps';
import { useEffect } from 'react';

import globeData from '~/assets/countries.json';
import { GameMachineContext } from '~/machines/gameMachine';

export const useReveal = (camera: Camera | null) => {
  const gameMachineRef = GameMachineContext.useActorRef();
  const countryToFind = GameMachineContext.useSelector((state) => state.context.countryToFind);
  const stateValue = GameMachineContext.useSelector((state) => state.value);
  useEffect(() => {
    if (stateValue === 'Revealed' && camera) {
      const countryToFindProperties = globeData.features.find(
        (feature) => feature.properties.name_long === countryToFind
      )?.properties;
      if (countryToFindProperties) {
        gameMachineRef.send({
          type: 'country.select',
          selectedCountry: countryToFindProperties.name_long,
        });
        camera.flyTo([countryToFindProperties.label_x, countryToFindProperties.label_y], 1000);
      }
    }
  }, [stateValue]);
};
