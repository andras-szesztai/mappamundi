import Mapbox, { Camera } from '@rnmapbox/maps';
import { View, useWindowDimensions } from 'react-native';

import globeData from '~/assets/countries.json';

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
          onPress={(e) => {
            console.log(e.features);
          }}
          id="smileyFaceSource"
          shape={globeData as any}>
          <Mapbox.FillLayer
            id="countriesLayer"
            style={{
              fillColor: 'transparent',
              fillOutlineColor: 'black',
            }}
          />
        </Mapbox.ShapeSource>
      </Mapbox.MapView>
    </View>
  );
}
