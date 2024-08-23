import TabBar from "@/components/navigation/TabBar";
import { Tabs } from "expo-router";

const RootLayout = () => {

    return (
        <Tabs
            screenOptions={{ headerShown: false }}
            tabBar={props => <TabBar {...props} />}
        >
            <Tabs.Screen options={{ title: "Inicio" }} name="index" />
            <Tabs.Screen name="tickets" />
            <Tabs.Screen name="buscar" />
            <Tabs.Screen name="perfil" options={{ title: "Perfil" }} />
        </Tabs>
    )
}

export default RootLayout