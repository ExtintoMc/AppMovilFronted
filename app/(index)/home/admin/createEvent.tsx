import React, { useState } from 'react';
import { View, TextInput, Button, Text, TouchableOpacity, StyleSheet, Image, Modal } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useEvent } from '@/context/EventContext';
import { useAuth } from '@/context/AuthContext';
import { useNavigation } from '@react-navigation/native';

const EventForm = () => {
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [location, setLocation] = useState('');
    const [status, setStatus] = useState('active');
    const [cover, setCover] = useState<string | null>(null);
    const [date, setDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);

    const { userState } = useAuth();
    const { onCreateEvent } = useEvent();
    const navigation = useNavigation(); 

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled && result.assets.length > 0) {
            setCover(result.assets[0].uri);
        }
    };

    const onDateChange = (event: any, selectedDate?: Date) => {
        setShowDatePicker(false);
        if (selectedDate) {
            setDate(selectedDate);
        }
    };

    const handleSubmit = async () => {
        if (onCreateEvent) {
            console.log('entrado')
            await onCreateEvent({ title, desc, location, status, cover, date, userId: userState?.id });
        }
    };


    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Title"
                value={title}
                onChangeText={setTitle}
            />
            <TextInput
                style={styles.input}
                placeholder="Description"
                value={desc}
                onChangeText={setDesc}
                multiline
            />
            <TextInput
                style={styles.input}
                placeholder="Location"
                value={location}
                onChangeText={setLocation}
            />

            <TouchableOpacity onPress={pickImage}>
                <Text style={styles.buttonText}>Select Cover Image</Text>
            </TouchableOpacity>

            {cover && <Image source={{ uri: cover }} style={styles.image} />}

            <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                <Text style={styles.buttonText}>Select Event Date</Text>
            </TouchableOpacity>
            <Text style={styles.dateText}>{date.toDateString()}</Text>

            <Modal
                transparent={true}
                visible={showDatePicker}
                animationType="slide"
                onRequestClose={() => setShowDatePicker(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.pickerContainer}>
                        <DateTimePicker
                            value={date}
                            mode="date"
                            display="default"
                            onChange={onDateChange}
                        />
                        <Button title="Confirm" onPress={() => setShowDatePicker(false)} />
                    </View>
                </View>
            </Modal>

            <TouchableOpacity onPress={handleSubmit}>
                <Text style={styles.submitButton}>Submit</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: '#007BFF',
        marginBottom: 10,
        textAlign: 'center',
    },
    image: {
        width: 300,
        height: 200,
        resizeMode: 'cover',
        marginBottom: 10,
    },
    dateText: {
        textAlign: 'center',
        marginBottom: 10,
    },
    submitButton: {
        backgroundColor: '#007BFF',
        color: 'white',
        padding: 15,
        textAlign: 'center',
        borderRadius: 5,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    pickerContainer: {
        backgroundColor: 'white',
        marginHorizontal: 20,
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
    },
});

export default EventForm;
