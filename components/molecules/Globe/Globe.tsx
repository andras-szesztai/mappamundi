import { GeoPermissibleObjects, geoOrthographic, geoPath } from 'd3-geo';
import React, { useState } from 'react';
import { useWindowDimensions } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { Circle, G, Path, Svg } from 'react-native-svg';
import { View } from 'tamagui';

import globeData from '~/assets/world.json';

const sensitivity = 75;
const baseScale = 150;

export function Globe() {
  const { height, width } = useWindowDimensions();
  const [rotation, setRotation] = useState<number[]>([0, 0]);
  const [scale, setScale] = useState(baseScale);
  const projection = geoOrthographic()
    .scale(scale)
    .center([0, 0])
    .rotate(rotation as [number, number])
    .translate([width / 2, height / 2]);
  const initialScale = projection.scale();
  const path = geoPath().projection(projection);
  const pan = Gesture.Pan();
  pan.runOnJS(true).onChange(({ ...rest }) => {
    if (Math.abs(rest.velocityX) > 200 || Math.abs(rest.velocityY) > 200) {
      const k = sensitivity / scale;
      const newY = rotation[1] - rest.changeY * k;
      const newRotation = [
        rotation[0] + rest.changeX * k,
        newY > 90 ? 90 : newY < -90 ? -90 : newY,
      ];
      setRotation(newRotation);
    }
  });
  const zoom = Gesture.Pinch();
  zoom.onChange(({ scale: changedScale }) => {
    const newScale = scale * changedScale;
    const percentOfBase = newScale / baseScale;
    if (percentOfBase > 0.8 && percentOfBase < 4) {
      setScale(newScale);
    }
  });
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  return (
    <View>
      <GestureDetector gesture={pan}>
        <GestureDetector gesture={zoom}>
          <Svg height={height} width={width}>
            <G>
              <Circle cx={width / 2} cy={height / 2} r={initialScale} stroke="#000" fill="#eee" />
              {globeData.features.map((d) => {
                const countryPath = path(d as GeoPermissibleObjects);
                if (countryPath === null) return null;
                return (
                  <Path
                    key={d.id}
                    d={countryPath}
                    stroke="#000"
                    fill={
                      selectedCountry === d.properties.name
                        ? 'rgba(255, 0, 0, 0.5)'
                        : 'rgba(0, 0, 0, 0.5)'
                    }
                    onPress={() => {
                      setSelectedCountry(d.properties.name);
                    }}
                  />
                );
              })}
            </G>
          </Svg>
        </GestureDetector>
      </GestureDetector>
    </View>
  );
}
