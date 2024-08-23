import { EventProvider } from "@/context/EventContext";
import { SplashScreen, Stack, Tabs } from "expo-router";

const RootLayout = () => {

    return (
        <EventProvider>
            <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="(tabs)" />
                <Stack.Screen name="[evento]" />
                <Stack.Screen name="map" />
                <Stack.Screen name="admin/createEvent" />
                <Stack.Screen name="admin/misEventos" />
            </Stack>
        </EventProvider>
    )
}

export default RootLayout