import { ThemedButton } from "@/components/theme/ThemedButton";
import Logo from "@/components/theme/ThemedLogo";
import { ThemedText } from "@/components/theme/ThemedText";
import { ThemedTitle } from "@/components/theme/ThemedTitle";
import { useNavigation } from "expo-router";
import { View, Text } from "react-native";

const Index = () => {

  const navigation = useNavigation()

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >

      <Logo style={{ width: 250, height: 232 }} />
      <ThemedTitle>¡Bienvenido!</ThemedTitle>
      <ThemedText darkColor="#A0A0A0" lightColor="#3B3B3B" style={{ paddingBottom: 35, textAlign: 'center' }}>Inicia sesion o registrate para continuar</ThemedText>
      <ThemedButton lightColor="#9655FF" onPress={() => { navigation.navigate('auth/login' as never) }} >
        <ThemedText type="black" darkColor="#1a1a1a" lightColor="#dadada">Iniciar sesión</ThemedText>
      </ThemedButton>
      <ThemedButton lightColor="#9655FF" onPress={() => { navigation.navigate('auth/register' as never) }} type="secundario">
        <ThemedText lightColor="#9655FF" type="black">Regístrate</ThemedText>
      </ThemedButton>

    </View>
  );
}

export default Index;