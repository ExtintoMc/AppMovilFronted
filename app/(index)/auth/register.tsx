import React, { useState } from 'react';
import Input, { onChangeProps } from "@/components/authComponents/Input";
import { useNavigation } from "expo-router";
import { Pressable, View } from "react-native";
import { useForm } from "@/hooks/useForm";
import { ThemedTitle } from '@/components/theme/ThemedTitle';
import { ThemedText } from '@/components/theme/ThemedText';
import { ThemedButton } from '@/components/theme/ThemedButton';
import { useAuth } from '@/context/AuthContext';

const initialState = {
    username: { value: '', error: '', hasError: false, active: false, name: 'username', isFormValid: false },
    email: { value: '', error: '', hasError: false, active: false, name: 'email', isFormValid: false },
    password: { value: '', error: '', hasError: false, active: false, name: 'password', isFormValid: false }
};

const Register = () => {
    const { formState, onChange, isFormValid } = useForm(initialState);
    const navigation = useNavigation();
    const [errorMessage, setErrorMessage] = useState('');
    const { onRegister } = useAuth()

    const onSubmit = async () => {
        if (!formState.username.value) setErrorMessage('Please enter a username');
        else {
            setErrorMessage('')
            try {
                const res = await onRegister!(formState.username.value, formState.email.value, formState.password.value)
            } catch (error) {

            }
        }
    };

    const onError = () => setErrorMessage('Invalid data received');

    const onHandleChange = ({ text, name }: onChangeProps) => onChange({ text, name });

    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: 'center' }}>
            <ThemedTitle style={{ lineHeight: 77, margin: 10 }}>Registrate para unirte</ThemedTitle>

            {['username', 'email', 'password'].map((field) => (
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
            {errorMessage ? (
                <ThemedText type="peque" style={{ marginVertical: 10, color: 'red' }}>{errorMessage}</ThemedText>
            ) : null}
            <View style={{ width: 300, justifyContent: 'center', alignItems: 'flex-end', marginVertical: 10 }}>
                <ThemedText type="peque">Olvidaste tu contraseña?</ThemedText>
            </View>
            <ThemedButton lightColor='#9655FF' onPress={isFormValid ? onSubmit : onError}>
                <ThemedText type="black" darkColor="#1a1a1a" lightColor="#dadada">Registrarse</ThemedText>
            </ThemedButton>
            <View style={{ flexDirection: 'row', marginTop: 20 }}>
                <ThemedText type="peque">Ya tienes una cuenta?</ThemedText>
                <Pressable onPress={() => navigation.navigate('auth/login' as never)}>
                    <ThemedText type="peque" lightColor="#9655FF" darkColor="#B07EFF">  Iniciar sesión</ThemedText>
                </Pressable>
            </View>
        </View>
    );
};

export default Register;
