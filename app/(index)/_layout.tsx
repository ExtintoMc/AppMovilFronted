import { useEffect } from "react";
import { Stack, useRouter } from "expo-router";
import { useAuth } from "@/context/AuthContext";

const RootLayout = () => {
    const { authState } = useAuth();
    const isAuthenticated = authState?.authenticated;
    const router = useRouter();

    useEffect(() => {
        if (isAuthenticated === true) {
            router.replace("/home");
        } else if (isAuthenticated === false) {
            router.replace("/");
        }
    }, [isAuthenticated]);

    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="home" />
        </Stack>
    );
}

export default RootLayout;
