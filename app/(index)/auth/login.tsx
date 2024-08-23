import { useEffect, useState } from "react"
import { Pressable, View } from "react-native"
import Input from "@/components/authComponents/Input"
import { ThemedButton } from "@/components/theme/ThemedButton"
import { ThemedText } from "@/components/theme/ThemedText"
import { ThemedTitle } from "@/components/theme/ThemedTitle"
import { useNavigation } from "expo-router"
import { FormState, useForm } from "@/hooks/useForm"
import { onChangeProps } from "@/components/authComponents/Input"
import { useAuth } from "@/context/AuthContext"

const initialState: FormState = {
    email: {
        value: '',
        error: '',
        hasError: false,
        active: false,
        name: 'email',
        isFormValid: false,
    },
    password: {
        value: '',
        error: '',
        hasError: false,
        active: false,
        name: 'password',
        isFormValid: false,
    }
}

const Login = () => {

    const { formState, onChange, isFormValid } = useForm(initialState)
    const navigation = useNavigation()
    const { onLogin, errors, authState } = useAuth()
    const [errorMessage, setErrorMessage] = useState('');

    const authenticated = authState?.authenticated

    const onHandleChange = ({ text, name }: onChangeProps) => {
        onChange({ text, name })
    }

    const onSubmit = async () => {
        try {
            const res = await onLogin!(formState.email.value, formState.password.value)
        } catch (error) {
            console.log(error)
        }
    }

    const onError = () => setErrorMessage('Invalid data received');

    useEffect(() => {
        console.log(authState)
    }, [authState])

    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: 'center', }}>
            <ThemedTitle style={{ lineHeight: 77, margin: 10 }}>Bienvenido de vuelta</ThemedTitle>
            {['email', 'password'].map((field) => (
                <Input
                    key={field}
                    placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                    icon={field === 'password' ? 'lock-closed-outline' : field === 'email' ? 'mail-outline' : 'person-outline'}
                    onChange={onHandleChange}
                    name={formState[field].name}
                    value={formState[field].value}
                    error={formState[field].error}
                    hasError={formState[field].hasError}
                    active={formState[field].active}
                />
            ))}
            <View style={{ width: 300, justifyContent: 'center', alignItems: 'flex-end', marginVertical: 10 }}>
                <ThemedText type="peque"> Olvidaste tu contraseña?</ThemedText>
            </View>
            <ThemedButton lightColor="#9655FF" onPress={isFormValid ? onSubmit : onError} >
                <ThemedText type="black" darkColor="#1a1a1a" lightColor="#dadada">Iniciar sesión</ThemedText>
            </ThemedButton>
            <View style={{ flexDirection: 'row', marginTop: 20 }}>
                <ThemedText type="peque">No tienes una cuenta?  </ThemedText>
                <Pressable onPress={() => { navigation.navigate('auth/register' as never) }}>
                    <ThemedText type="peque" lightColor="#9655FF" darkColor="#B07EFF">Registrate</ThemedText>
                </Pressable>
            </View>
        </View>
    )
}

export default Login