import { View, Text, StyleSheet, Button, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from './[evento]';
import { useRoute } from '@react-navigation/native';
import { ThemedTitle } from '@/components/theme/ThemedTitle';
import { useEvent } from '@/context/EventContext';
import { useEffect } from 'react';
import { ThemedText } from '@/components/theme/ThemedText';

type ComprarScreenProps = StackScreenProps<RootStackParamList, 'comprar'>;

const Comprar = () => {
    const route = useRoute<ComprarScreenProps['route']>();
    const { eventId } = route.params;

    const { onGetEventById, event } = useEvent();

    const evento = typeof eventId === 'string' ? eventId : undefined;

    useEffect(() => {
        if (evento && onGetEventById) {
            onGetEventById(evento);
        }
    }, [evento]);

    if (!event) {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <ActivityIndicator size={"large"} />
            </View>
        );
    }


    return (
        <View style={styles.container}>
            <View style={{ backgroundColor: 'white', width: 325, height: 650, borderRadius: 30 }}>
                <ThemedTitle type='titulo3'>{event.title}</ThemedTitle>
                <ThemedText>Muestra este tiquet en la entrada</ThemedText>
                <View style={{ width: 300, height: 1, borderBottomColor: '#d1d1d1', borderBottomWidth: 1 }}></View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default Comprar;
