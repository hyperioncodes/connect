import { Stack, useRouter } from 'expo-router';
import { useFonts } from 'expo-font';

import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useCallback } from 'react';
import { useAuth } from '../utils/useAuth';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const router = useRouter();
 
  const [loaded, error] = useFonts({
    Nunito: require('../assets/fonts/Nunito.ttf'),
  });

  const { user, loading: authLoading } = useAuth();

  // runs to hide splash screen
  useEffect(() => {
    if ((loaded || error) && !authLoading) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error, authLoading]);

  //redirects once loading
  useEffect(() => {
    if ((loaded || error) && !authLoading && !user) {
      router.replace('/auth');
    }
  }, [loaded, error, authLoading, user]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView>
      <Stack 
      screenOptions={{
        headerStyle: {
          backgroundColor: '#3a86ff',
        },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: {
          fontWeight: 'bold',
        }}}/>
      
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
