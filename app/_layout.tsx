import { useFonts } from 'expo-font';
import { Stack, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import getCurrentUser from '@/utils/getCurrentUser';
import { useRootNavigationState } from 'expo-router';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const router = useRouter();
  const navigationState = useRootNavigationState();

  const [user, setUser] = useState<any>(null);
  const [fontsLoaded, fontError] = useFonts({
    Nunito: require('../assets/fonts/Nunito.ttf'),
  });
  const [isReady, setIsReady] = useState(false);

  // Load user async
  useEffect(() => {
    async function fetchUser() {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
    }
    fetchUser();
  }, []);

  // Hide splash screen only after fonts loaded, user loaded, and navigation ready
  useEffect(() => {
    if (fontsLoaded && !fontError && user !== null && navigationState?.key) {
      SplashScreen.hideAsync();
      setIsReady(true);
    }
  }, [fontsLoaded, fontError, user, navigationState?.key]);

  // Redirect once ready and user is empty
  useEffect(() => {
    if (!isReady) return;
    if (!user || Object.keys(user).length === 0) {
      router.replace('/auth');
      console.log('redirect to auth');
    } else {
      console.log('User:', JSON.stringify(user));
    }
  }, [isReady, user, router]);

  if (!isReady) {
    return null; // Keep splash screen visible
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <Stack
          screenOptions={{
            headerStyle: {
              backgroundColor: '#3a86ff',
            },
            headerTintColor: '#FFFFFF',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
