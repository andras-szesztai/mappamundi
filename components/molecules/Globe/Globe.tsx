import Mapbox, { Camera, FillLayer, MapView, ShapeSource } from '@rnmapbox/maps';
import { FeatureCollection, Geometry, GeoJsonProperties } from 'geojson';
import { useRef } from 'react';
import { View, useWindowDimensions } from 'react-native';
import colors from 'tailwindcss/colors';

import { initialCameraProps, mapViewProps } from './contants';
import { useReveal } from './hooks';

import globeData from '~/assets/countries.json';
import { GameMachineContext } from '~/machines/gameMachine';

Mapbox.setAccessToken(
  'pk.eyJ1Ijoic3plYW5kciIsImEiOiJjbHN5eTI4b2gwa2JjMmtwMmNtOWtjcWx6In0.Ae7WTlD4Heg2XoOdQEcP4g'
);

type ShapeType = FeatureCollection<Geometry, GeoJsonProperties>;

export function Globe() {
  const { height, width } = useWindowDimensions();
  const camera = useRef<Camera>(null);
  const gameMachineRef = GameMachineContext.useActorRef();
  const countryToFind = GameMachineContext.useSelector((state) => state.context.countryToFind);
  const selectedCountry = GameMachineContext.useSelector((state) => state.context.selectedCountry);
  const guessedCountry = GameMachineContext.useSelector((state) => state.context.guessedCountry);
  const stateValue = GameMachineContext.useSelector((state) => state.value);
  const selectedShape = {
    type: 'FeatureCollection',
    features: [
      globeData.features.find((feature) => feature.properties.name_long === selectedCountry),
    ],
  } as ShapeType;
  useReveal(camera.current);
  return (
    <View
      className="absolute"
      style={{
        width,
        height,
      }}>
      <MapView
        style={{
          width,
          height,
        }}
        {...mapViewProps}>
        <Camera ref={camera} {...initialCameraProps} />
        <ShapeSource
          id="countrySource"
          onPress={(e) => {
            if (stateValue === 'Active') {
              gameMachineRef.send({
                type: 'country.select',
                selectedCountry: e.features[0].properties?.name_long,
              });
            }
          }}
          shape={globeData as ShapeType}>
          <FillLayer
            id="countriesLayer"
            style={{
              fillColor: 'transparent',
              fillOutlineColor: colors.gray[900],
            }}
          />
        </ShapeSource>
        {!!selectedCountry && (
          <ShapeSource
            id="selectedCountrySource"
            shape={selectedShape}
            onPress={() => {
              gameMachineRef.send(
                countryToFind === selectedCountry ? { type: 'success' } : { type: 'failure' }
              );
            }}>
            <FillLayer
              id="selectedCountryLayer"
              style={{
                fillColor: colors.teal[500],
                fillOutlineColor: colors.teal[950],
              }}
            />
          </ShapeSource>
        )}
        {!!guessedCountry && (
          <ShapeSource id="guessedCountrySource" shape={selectedShape}>
            <FillLayer
              id="guessedCountryLayer"
              style={{
                fillColor: stateValue === 'Success' ? colors.teal[800] : colors.rose[800],
                fillOutlineColor: stateValue === 'Success' ? colors.teal[950] : colors.rose[950],
              }}
            />
          </ShapeSource>
        )}
      </MapView>
    </View>
  );
}
