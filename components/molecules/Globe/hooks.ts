import { geoOrthographic, geoPath } from 'd3-geo';
import { useState } from 'react';
import {
  GestureUpdateEvent,
  PanGestureChangeEventPayload,
  PanGestureHandlerEventPayload,
  PinchGestureChangeEventPayload,
  PinchGestureHandlerEventPayload,
} from 'react-native-gesture-handler';

import { baseScale } from './constants';

export const usePath = (width: number, height: number) => {
  const [rotation, setRotation] = useState<number[]>([0, 0]);
  const [scale, setScale] = useState(baseScale);
  const projection = geoOrthographic()
    .scale(scale)
    .center([0, 0])
    .rotate(rotation as [number, number])
    .translate([width / 2, height / 2]);
  const path = geoPath().projection(projection);

  const onPanChange = ({
    velocityX,
    velocityY,
    changeX,
    changeY,
  }: GestureUpdateEvent<PanGestureHandlerEventPayload & PanGestureChangeEventPayload>) => {
    if (Math.abs(velocityX) > 200 || Math.abs(velocityY) > 200) {
      const k = 75 / scale;
      const newY = rotation[1] - changeY * k;
      const newRotation = [rotation[0] + changeX * k, newY > 90 ? 90 : newY < -90 ? -90 : newY];
      setRotation(newRotation);
    }
  };

  const onZoomChange = ({
    scale: changedScale,
  }: GestureUpdateEvent<PinchGestureHandlerEventPayload & PinchGestureChangeEventPayload>) => {
    const newScale = scale * changedScale;
    const percentOfBase = newScale / baseScale;
    if (percentOfBase > 0.8 && percentOfBase < 10) {
      setScale(newScale);
    }
  };
  return { path, projection, onPanChange, onZoomChange };
};
