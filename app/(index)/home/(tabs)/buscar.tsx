import { useEffect, useState } from "react"
import { Pressable, StyleSheet, TextInput, View } from "react-native"
import Input from "@/components/authComponents/Input"
import { ThemedButton } from "@/components/theme/ThemedButton"
import { ThemedText } from "@/components/theme/ThemedText"
import { ThemedTitle } from "@/components/theme/ThemedTitle"
import { useNavigation } from "expo-router"
import { FormState, useForm } from "@/hooks/useForm"
import { onChangeProps } from "@/components/authComponents/Input"
import { useAuth } from "@/context/AuthContext"
import { useEvent } from "@/context/EventContext"
import ListEvent from "@/components/eventComponents/ListEvent"

const Login = () => {

    const navigation = useNavigation()
    const [search, setSearch] = useState('')
    const { events } = useEvent()
    const { userState } = useAuth()

    const filteredEvent = events?.filter(event =>
        search.toLowerCase().includes(event.title.toLowerCase())
    )

    return (
        <View style={{ flex: 1 }}>
            <View style={{ alignItems: 'center', marginTop: 40 }}>
                <ThemedTitle type="titulo3" >Buscar evento</ThemedTitle>
                <View style={styles.containerInput}>
                    <TextInput
                        style={styles.input}
                        placeholder="Buscar"
                        placeholderTextColor={'#fff'}
                        value={search}
                        onChangeText={text => setSearch(text)}
                    />
                </View>
                {
                    filteredEvent ? (
                        <ListEvent event={filteredEvent} userId={`${userState?.id}`} />
                    ) : (
                        <ThemedText>
                            No se encontraron eventos.
                        </ThemedText>
                    )
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    containerInput: {
        width: '90%',
        height: 50,
        borderColor: '#d1d1d1',
        borderWidth: 1,
        borderRadius: 8,
        textAlign: 'center',
        justifyContent: 'center',
        padding: 10,
    },
    input: {
        color: '#fff',
    }
})

export default Login