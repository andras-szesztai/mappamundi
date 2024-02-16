import { geoOrthographic, geoPath } from 'd3-geo';
import React, { useState } from 'react';
import { useWindowDimensions } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { Circle, G, Path, Svg } from 'react-native-svg';
import { View } from 'tamagui';

import globeData from '~/assets/world.json';

const sensitivity = 50;

export function Globe() {
  const { height, width } = useWindowDimensions();
  const [rotation, setRotation] = useState<number[]>([0, 0]);
  const [scale, _setScale] = useState(150);
  const projection = geoOrthographic()
    .scale(scale)
    .center([0, 0])
    .rotate(rotation as [number, number])
    .translate([width / 2, height / 2]);
  const initialScale = projection.scale();
  const path = geoPath().projection(projection);
  const pan = Gesture.Pan();
  pan
    .shouldCancelWhenOutside(true)
    .failOffsetY(10)
    .failOffsetX(10)
    .runOnJS(true)
    .onChange(({ translationX, translationY, ...rest }) => {
      const k = sensitivity / scale;
      const newY = rotation[1] - rest.changeY * k;
      const newRotation = [
        rotation[0] + rest.changeX * k,
        newY > 90 ? 90 : newY < -90 ? -90 : newY,
      ];
      setRotation(newRotation);
    });

  return (
    <View borderColor="red" borderWidth={1}>
      <GestureDetector gesture={pan}>
        <Svg height={height} width={width}>
          <G>
            <Circle cx={width / 2} cy={height / 2} r={initialScale} stroke="#000" fill="#eee" />
            {globeData.features.map((d, i) => (
              <Path key={`path-${i}`} d={path(d)} fill="#000" />
            ))}
          </G>
        </Svg>
      </GestureDetector>
    </View>
  );
}
