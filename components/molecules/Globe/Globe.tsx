import { GeoPermissibleObjects } from 'd3-geo';
import React, { useState } from 'react';
import { useWindowDimensions } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { Circle, G, Path, Svg } from 'react-native-svg';

import { usePath } from './hooks';
import { getCountryFillColor } from './utils';

import globeData from '~/assets/world.json';
import Colors from '~/constants/Colors';

export function Globe() {
  const { height, width } = useWindowDimensions();
  const { path, projection, onZoomChange, onPanChange } = usePath(width, height);
  const pan = Gesture.Pan();
  pan.runOnJS(true).onChange(onPanChange);
  const zoom = Gesture.Pinch();
  zoom.runOnJS(true).onChange(onZoomChange);
  const [guessedCountry, setGuessedCountry] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  return (
    <GestureDetector gesture={pan}>
      <GestureDetector gesture={zoom}>
        <Svg height={height} width={width}>
          <G>
            <Circle
              cx={width / 2}
              cy={height / 2}
              r={projection.scale()}
              stroke={Colors.midnightGreen}
              fill={Colors.verdigris}
            />
            {globeData.features.map((d) => {
              const countryPath = path(d as GeoPermissibleObjects);
              if (countryPath === null) return null;
              return (
                <Path
                  key={d.id}
                  d={countryPath}
                  onLongPress={() => {
                    setSelectedCountry(null);
                    setGuessedCountry(d.id);
                  }}
                  onPress={() => {
                    setSelectedCountry(d.id);
                    setGuessedCountry(null);
                  }}
                  stroke={Colors.midnightGreen}
                  strokeWidth={1}
                  fill={getCountryFillColor(guessedCountry, selectedCountry, d.id)}
                />
              );
            })}
          </G>
        </Svg>
      </GestureDetector>
    </GestureDetector>
  );
}
