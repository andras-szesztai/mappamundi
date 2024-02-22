import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import './global.css';

export default function Layout() {
  const [loaded] = useFonts({
    fredokaLight: require('../assets/fonts/Fredoka-Light.ttf'),
    fredokaMedium: require('../assets/fonts/Fredoka-Medium.ttf'),
    fredokaBold: require('../assets/fonts/Fredoka-Bold.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) return null;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack />
    </GestureHandlerRootView>
  );
}
