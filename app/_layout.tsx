import { useFonts } from 'expo-font';
import { Stack, useRouter } from 'expo-router';

import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import getCurrentUser from '@/utils/getCurrentUser';
SplashScreen.preventAutoHideAsync();
 //hi
export default function RootLayout() {
  const router = useRouter();
 
  const [loaded, error] = useFonts({
    Nunito: require('../assets/fonts/Nunito.ttf'),
  });

  const user = getCurrentUser()
  
  // runs to hide splash screen
  useEffect(() => {
    if ((loaded || error)) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  //redirects once loading
  useEffect(() => {
    if ((loaded || error) && !user) {
      router.replace('/auth');
    }
  }, [loaded, error, user]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{flex:1}}>
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
