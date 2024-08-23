import { useEffect } from "react";
import { SplashScreen, Stack } from "expo-router";
import { useColorScheme } from "react-native";
import { ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { DarkTheme, DefaultTheme } from "../components/start/Theme";
import { AuthProvider } from "@/context/AuthContext";

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {

  const [loaded] = useFonts({
    Lato: require('../assets/fonts/Lato/Lato-Regular.ttf'),
    LatoBlack: require('../assets/fonts/Lato/Lato-Black.ttf'),
    Mukta: require('../assets/fonts/Mukta/Mukta-ExtraBold.ttf'),
    WorkSans: require('../assets/fonts/Work_Sans/WorkSans-Black.ttf')
  })

  const colorScheme = useColorScheme();

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded])

  if (!loaded) {
    return null
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <AuthProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(index)" />
        </Stack>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default RootLayout