import Mapbox, { Camera } from '@rnmapbox/maps';
import { useState } from 'react';
import { View, useWindowDimensions } from 'react-native';

import globeData from '~/assets/countries.json';
import Colors from '~/constants/Colors';

Mapbox.setAccessToken(
  'pk.eyJ1Ijoic3plYW5kciIsImEiOiJjbHN5eTI4b2gwa2JjMmtwMmNtOWtjcWx6In0.Ae7WTlD4Heg2XoOdQEcP4g'
);

export function Globe() {
  const { height, width } = useWindowDimensions();
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [guessedCountry, setGuessedCountry] = useState<string | null>(null);
  const selectedShape = globeData.features.find(
    (feature: any) => feature.properties.formal_en === selectedCountry
  );
  const guessedShape = guessedCountry && selectedShape;
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
        <Camera maxZoomLevel={10} minZoomLevel={1} />
        <Mapbox.ShapeSource
          id="countrySource"
          onPress={(e) => {
            setGuessedCountry(null);
            setSelectedCountry(e.features[0].properties?.formal_en);
          }}
          shape={globeData as any}>
          <Mapbox.FillLayer
            id="countriesLayer"
            style={{
              fillColor: 'transparent',
              fillOutlineColor: Colors.raisinBlack,
            }}
          />
        </Mapbox.ShapeSource>
        {selectedShape && (
          <Mapbox.ShapeSource
            id="selectedCountrySource"
            shape={selectedShape as any}
            onPress={(e) => {
              setGuessedCountry(e.features[0].properties?.formal_en);
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
        {guessedShape && (
          <Mapbox.ShapeSource id="guessedCountrySource" shape={guessedShape as any}>
            <Mapbox.FillLayer
              id="guessedCountryLayer"
              style={{
                fillColor: Colors.midnightGreen,
                fillOutlineColor: Colors.midnightGreen,
              }}
            />
          </Mapbox.ShapeSource>
        )}
      </Mapbox.MapView>
    </View>
  );
}
