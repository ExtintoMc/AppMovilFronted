import { ThemedButton } from "@/components/theme/ThemedButton";
import { ThemedText } from "@/components/theme/ThemedText";
import { ThemedTitle } from "@/components/theme/ThemedTitle";
import { useAuth } from "@/context/AuthContext";
import { Link, useNavigation } from "expo-router";
import { Pressable, Text, View } from "react-native";

const Perfil = () => {

    const { userState, onLogout } = useAuth()

    const Logout = () => {
        if (onLogout) {
            onLogout();
        }
    }

    console.log(userState)

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <ThemedTitle>{userState?.username}</ThemedTitle>
            {userState?.rol === 'admin' && (
                <Link asChild href='/home/admin/createEvent'>
                    <Pressable style={{ width: 300, height: 50, backgroundColor: '#d1d1d1', borderRadius: 50, alignItems: 'center', justifyContent: 'center' }}>
                        <ThemedText type="black" darkColor="#1d1d1d">Crear Evento</ThemedText>
                    </Pressable>
                </Link>
            )}
            {userState?.rol === 'artista' && (
                <View style={{ paddingBottom: 10 }}>
                    <Link asChild href='/home/admin/createEvent'>
                        <Pressable style={{ width: 300, height: 50, backgroundColor: '#FFD0D0', borderRadius: 50, alignItems: 'center', justifyContent: 'center', marginBottom: 5 }}>
                            <ThemedText type="black" darkColor="#1d1d1d">Crear Evento</ThemedText>
                        </Pressable>
                    </Link>
                    <Link asChild href='/home/admin/misEventos'>
                        <Pressable style={{ width: 300, height: 50, backgroundColor: '#d1d1d1', borderRadius: 50, alignItems: 'center', justifyContent: 'center' }}>
                            <ThemedText type="black" darkColor="#1d1d1d">Mis eventos</ThemedText>
                        </Pressable>
                    </Link>
                </View>
            )}
            <ThemedButton lightColor="#9655FF" onPress={Logout} >
                <ThemedText type="black" darkColor="#1a1a1a" lightColor="#dadada">Cerrar sesion</ThemedText>
            </ThemedButton>
        </View>
    )
}

export default Perfil