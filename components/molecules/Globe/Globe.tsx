import Mapbox from '@rnmapbox/maps';
import { View, useWindowDimensions } from 'react-native';

import globeData from '~/assets/custom.geo.json';

Mapbox.setAccessToken(
  'pk.eyJ1Ijoic3plYW5kciIsImEiOiJjbHN5eTI4b2gwa2JjMmtwMmNtOWtjcWx6In0.Ae7WTlD4Heg2XoOdQEcP4g'
);

export function Globe() {
  const { height, width } = useWindowDimensions();
  return (
    <View
      className="flex bg-verdigris"
      style={{
        width,
        height,
      }}>
      <Mapbox.MapView
        projection="globe"
        className="flex-1"
        style={{
          width,
          height,
        }}>
        <Mapbox.ShapeSource id="smileyFaceSource" shape={globeData as any}>
          <Mapbox.FillLayer
            id="smileyFaceFill"
            style={{
              fillAntialias: true,
              fillColor: 'white',
              fillOutlineColor: 'black',
            }}
          />
        </Mapbox.ShapeSource>
      </Mapbox.MapView>
    </View>
  );
}
