import { TextInput, View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";

export type onChangeProps = {
    text: string;
    name: string;
}

type InputProps = {
    onChange: ({ text, name }: onChangeProps) => void;
    name: string;
    placeholder: string;
    value: string;
    icon: string;
    error: string;
    hasError: boolean;
    active: boolean;
    secureTextEntry?: boolean;
}

const Input = ({ placeholder, value, icon, name, error, hasError, secureTextEntry, active, onChange }: InputProps) => {
    const [isFocused, setIsFocused] = useState(false);

    icon = icon

    const handleFocus = () => {
        setIsFocused(true);
    }

    const handleBlur = () => {
        setIsFocused(false);
    }

    return (
        <View>
            <View style={[styles.containerButton]}>
                <Ionicons name={icon} style={[styles.icon, isFocused && { color: '#B07EFF' }]} />
                <TextInput
                    style={[styles.input, isFocused && { color: '#B07EFF' }]}
                    placeholder={placeholder}
                    value={value}
                    onChangeText={text => onChange({ text, name })}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    secureTextEntry={secureTextEntry}
                    placeholderTextColor={isFocused ? '#B07EFF' : '#ADADAD'}
                />
            </View>
            {hasError && <Text style={styles.error}>{error}</Text>}
        </View>
    );
}

const styles = StyleSheet.create({
    label: {
        fontSize: 20,
        color: '#ffffff',
    },
    containerButton: {
        flexDirection: 'row',
        width: 300,
        height: 50,
        borderRadius: 50,
        alignItems: 'center',
        backgroundColor: '#2a2a2a',
        marginTop: 5
    },
    icon: {
        color: '#ffffff',
        fontSize: 25,
        marginHorizontal: 20,
    },
    input: {
        color: '#ffffff',
        width: 200,
    },
    error: {
        color: 'red',
    },
});

export default Input;
