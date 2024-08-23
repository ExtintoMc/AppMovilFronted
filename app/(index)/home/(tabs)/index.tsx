import Input, { onChangeProps } from "@/components/authComponents/Input";
import Carrousel from "@/components/homeComponents/Carrousel";
import { ThemedText } from "@/components/theme/ThemedText";
import { ThemedTitle } from "@/components/theme/ThemedTitle";
import { useAuth } from "@/context/AuthContext";
import { useEvent } from "@/context/EventContext";
import { FormState, useForm } from "@/hooks/useForm";
import { useNavigation } from "expo-router";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Index = () => {
    const { events = [] } = useEvent();
    const { userState } = useAuth()

    if (userState?.id === null) {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <ActivityIndicator size={"large"} />
            </View>
        )
    }

    return (
        <SafeAreaView>
            <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <ThemedTitle type="titulo3" >Bienvenido, {userState?.username}</ThemedTitle>
                    <ThemedText type="peque">Explora tus eventos favoritos</ThemedText>
                </View>
                <Carrousel images={events} userId={`${userState?.id}`} />
            </View>
        </SafeAreaView>

    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleContainer: {
        width: '100%',
        padding: 20,
    }
})

export default Index;
