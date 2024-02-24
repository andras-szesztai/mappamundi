/* eslint-disable max-lines */
import Mapbox, { Camera } from '@rnmapbox/maps';
import { FeatureCollection, Geometry, GeoJsonProperties } from 'geojson';
import { useRef, useEffect } from 'react';
import { View, useWindowDimensions } from 'react-native';

import globeData from '~/assets/countries.json';
import Colors from '~/constants/Colors';
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
  useEffect(() => {
    if (stateValue === 'Revealed') {
      const countryToFindProperties = globeData.features.find(
        (feature) => feature.properties.name_long === countryToFind
      )?.properties;
      if (countryToFindProperties) {
        gameMachineRef.send({
          type: 'country.select',
          selectedCountry: countryToFindProperties.name_long,
        });
        camera.current?.flyTo(
          [countryToFindProperties.label_x, countryToFindProperties.label_y],
          1000
        );
      }
    }
  }, [stateValue]);
  return (
    <View
      style={{
        width,
        height,
      }}>
      <Mapbox.MapView
        projection="globe"
        styleURL="mapbox://styles/szeandr/clsz16wfp00ej01megfms087d"
        rotateEnabled={false}
        logoEnabled={false}
        scaleBarEnabled={false}
        style={{
          width,
          height,
        }}>
        <Camera
          ref={camera}
          maxZoomLevel={10}
          minZoomLevel={1}
          centerCoordinate={[0, 0]}
          animationDuration={0}
          zoomLevel={1.5}
        />
        <Mapbox.ShapeSource
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
          <Mapbox.FillLayer
            id="countriesLayer"
            style={{
              fillColor: 'transparent',
              fillOutlineColor: Colors.raisinBlack,
            }}
          />
        </Mapbox.ShapeSource>
        {!!selectedCountry && (
          <Mapbox.ShapeSource
            id="selectedCountrySource"
            shape={selectedShape}
            onPress={() => {
              gameMachineRef.send(
                countryToFind === selectedCountry ? { type: 'success' } : { type: 'failure' }
              );
            }}>
            <Mapbox.FillLayer
              id="selectedCountryLayer"
              style={{
                fillColor: Colors.verdigris,
                fillOutlineColor: Colors.midnightGreen,
              }}
            />
          </Mapbox.ShapeSource>
        )}
        {!!guessedCountry && (
          <Mapbox.ShapeSource id="guessedCountrySource" shape={selectedShape}>
            <Mapbox.FillLayer
              id="guessedCountryLayer"
              style={{
                fillColor: stateValue === 'Success' ? Colors.midnightGreen : Colors.crayola,
                fillOutlineColor: stateValue === 'Success' ? Colors.midnightGreen : Colors.amaranth,
              }}
            />
          </Mapbox.ShapeSource>
        )}
      </Mapbox.MapView>
    </View>
  );
}
