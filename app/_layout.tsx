import { FontAwesome5 } from '@expo/vector-icons'; // Update the import statement if needed
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
  ThemeProvider,
} from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack, useRouter } from 'expo-router';
import { useEffect, useState } from 'react'; // Added useState
import { useColorScheme } from 'react-native';
import * as SecureStore from 'expo-secure-store';
export { ErrorBoundary } from 'expo-router';
import * as NavigationBar from 'expo-navigation-bar';

export const unstable_settings = {
  initialRouteName: '(auth)',
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {

  const [loaded, error] = useFonts({
    'mon': require('../assets/fonts/Montserrat-Regular.ttf'),
    'mon-sb': require('../assets/fonts/Montserrat-SemiBold.ttf'),
    'mon-b': require('../assets/fonts/Montserrat-Bold.ttf'),
  });
  const router = useRouter();
  const [session, setSession] = useState<string | null>(null); // Use state to manage session

  useEffect(() => {
    if (error) {
      console.error('Error loading fonts:', error);
    }
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);
  useEffect(() => {
     
    if(loaded){
      const checkUserSession = async () => {
         await SecureStore.deleteItemAsync('sessionJWT');
        try {
          const userSession = await SecureStore.getItemAsync('sessionJWT');
          if (userSession != null) {
            router.replace('/(tabs)/one');
          }
        } catch (e) {
          console.error('Error al obtener la sesión del usuario', e);
        }
      }
      checkUserSession();
    }

  }, [loaded]);
  if (!loaded) {
    return null;
  }

  return <RootLayoutNav session={session} /> ;
}

function RootLayoutNav({ session }: { session: string | null }) {
  const colorScheme = useColorScheme();
 
  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="index" options={{ presentation: 'modal', headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ presentation: 'modal', headerShown: false }} />
        <Stack.Screen name="modal" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)/login" options={{ presentation: 'modal', headerTitle: 'Login' }} />
        <Stack.Screen name="(auth)/register" options={{ presentation: 'modal', headerTitle: 'Register' }} />
      </Stack>
    </ThemeProvider>
  );
}
