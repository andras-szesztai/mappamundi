import { Camera, MapView } from '@rnmapbox/maps';
import { ComponentProps } from 'react';

export const initialCameraProps: ComponentProps<typeof Camera> = {
  maxZoomLevel: 10,
  minZoomLevel: 1,
  centerCoordinate: [0, 0],
  animationDuration: 0,
  zoomLevel: 1.5,
};

export const mapViewProps: ComponentProps<typeof MapView> = {
  projection: 'globe',
  styleURL: 'mapbox://styles/szeandr/clsz16wfp00ej01megfms087d',
  rotateEnabled: false,
  logoEnabled: false,
  scaleBarEnabled: false,
};
