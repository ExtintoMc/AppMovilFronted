import React, { useState, useEffect } from "react";
import { View, Text, ActivityIndicator, ScrollView, Pressable, StyleSheet, TextInput, Button } from "react-native";
import { Ticket, useEvent } from "@/context/EventContext";
import { useLocalSearchParams } from "expo-router";
import TopBar from "@/components/eventComponents/TopBar";
import { ThemedTitle } from "@/components/theme/ThemedTitle";
import { ThemedText } from "@/components/theme/ThemedText";
import { Ionicons } from "@expo/vector-icons";
import { handleIntegrationMP } from "@/utils/MPintegration";
import ModalBuy from "@/components/eventComponents/Modal";
import { useAuth } from "@/context/AuthContext";
import { createTicketByEvent } from "@/api/event";
import BuyButton from "@/components/eventComponents/BuyButton";

const Event = () => {
    const { evento } = useLocalSearchParams();
    const { onGetEventById, event } = useEvent();
    const { userState } = useAuth();
    const [modalOpen, setModalOpen] = useState(false);
    const [modal2Open, setModal2Open] = useState(false);
    const [ticketCount, setTicketCount] = useState(1);
    const eventId = typeof evento === 'string' ? evento : undefined;

    const [type, setType] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [available, setAvailable] = useState('');

    useEffect(() => {
        if (eventId && onGetEventById) {
            onGetEventById(eventId);
        }
    }, [eventId]);

    console.log(event);

    if (!event) {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <ActivityIndicator size={"large"} />
            </View>
        );
    }

    const handleBuy = (ticket: Ticket) => {
        const ticketBuy = {
            id: eventId,
            title: event.title,
            description: event.desc,
            picture_url: event.cover,
            quantity: ticketCount,
            unit_price: ticket.price
        }

        const ticketBuyBy = {
            userId: userState?.id,
            eventId: event.id,
            ticketId: ticket.id,
            quantity: ticketCount,
            paymentAmount: ticket.price
        }

        handleIntegrationMP(ticketBuy, ticketBuyBy);
    }

    const handlePrevent = (ticket: Ticket) => {
        const middlePrice = ticket.price / 2;

        const ticketBuy = {
            id: eventId,
            title: event.title,
            description: event.desc,
            picture_url: event.cover,
            quantity: ticketCount,
            unit_price: middlePrice
        }

        const ticketBuyBy = {
            userId: userState?.id,
            eventId: event.id,
            ticketId: ticket.id,
            quantity: ticketCount,
            paymentAmount: middlePrice
        }

        handleIntegrationMP(ticketBuy, ticketBuyBy);
    }

    const incrementCount = () => {
        if (ticketCount < 10) {
            setTicketCount(ticketCount + 1);
        }
    }

    const decrementCount = () => {
        if (ticketCount > 1) {
            setTicketCount(ticketCount - 1);
        }
    }

    const handleAddTicket = async () => {
        const res = await createTicketByEvent({ type, price, quantity, available, eventId });
        console.log(res.data);
    };

    return (
        <View style={{ flex: 1 }}>
            <ScrollView>
                <TopBar cover={event.cover} />
                <View style={{ width: '100%', alignItems: "center", justifyContent: "center" }}>
                    <View style={styles.containerText}>
                        <ThemedTitle style={{ marginVertical: 10 }} type="titulo3" >{event.title}</ThemedTitle>

                        <ThemedTitle type="titulo4">Descripcion</ThemedTitle>
                        <ThemedText style={{ marginBottom: 10 }} type="peque" >{event.desc}</ThemedText>

                        <View style={{ flexDirection: "row", padding: 5, alignItems: 'center' }}>
                            <Ionicons style={{ color: '#A1A1A1', paddingRight: 5, fontSize: 17 }} name="navigate" />
                            <ThemedText type="peque" darkColor="#A1A1A1">{event.location}</ThemedText>
                        </View>
                        <View style={{ flexDirection: "row", padding: 5 }}>
                            <Ionicons style={{ color: '#A1A1A1', paddingRight: 5, fontSize: 17 }} name="calendar" />
                            <ThemedText type="peque" darkColor="#A1A1A1">{event.date}</ThemedText>
                        </View>
                    </View>

                    {userState?.id === event.userId && (
                        <Pressable onPress={() => setModal2Open(true)} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: "center" }}>
                            <Ionicons style={styles.icon} name="add-circle-outline" />
                            <ThemedText type="pequeBlack">Add Ticket Types</ThemedText>
                        </Pressable>
                    )}

                    <ModalBuy isOpen={modal2Open}>
                        <View style={styles.modalContainer}>
                            <View style={styles.modalConten}>
                                <TextInput
                                    placeholder="Type"
                                    value={type}
                                    onChangeText={setType}
                                    style={styles.input}
                                />
                                <TextInput
                                    placeholder="Price"
                                    value={price}
                                    onChangeText={setPrice}
                                    keyboardType="numeric"
                                    style={styles.input}
                                />
                                <TextInput
                                    placeholder="Quantity"
                                    value={quantity}
                                    onChangeText={setQuantity}
                                    keyboardType="numeric"
                                    style={styles.input}
                                />
                                <TextInput
                                    placeholder="Available"
                                    value={available}
                                    onChangeText={setAvailable}
                                    keyboardType="numeric"
                                    style={styles.input}
                                />
                                <Button title="Add Ticket" onPress={handleAddTicket} />
                                <Button title="Cancel" onPress={() => setModal2Open(false)} color="#FF6868" />
                            </View>
                        </View>
                    </ModalBuy>

                    {event.tickets.map(ticket => (
                        <View key={ticket.id} style={{ marginVertical: 10 }}>
                            <Pressable onPress={() => setModalOpen(true)}>
                                <BuyButton type={ticket.type} price={ticket.price} avalible={ticket.available} />
                            </Pressable>

                            <ModalBuy isOpen={modalOpen}>
                                <View style={styles.modalContent}>
                                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                        <ThemedText type="pequeBlack" style={{ textAlign: 'center', marginHorizontal: 25, marginBottom: 10 }} >Cantidad de boletos</ThemedText>
                                        <View style={styles.counterContainer}>
                                            <Pressable onPress={decrementCount} style={styles.counterButton}>
                                                <Ionicons name="remove-circle-outline" size={24} color="white" />
                                            </Pressable>
                                            <ThemedText type="pequeBlack" style={{ marginHorizontal: 10 }}>{ticketCount}</ThemedText>
                                            <Pressable onPress={incrementCount} style={styles.counterButton}>
                                                <Ionicons name="add-circle-outline" size={24} color="white" />
                                            </Pressable>
                                        </View>
                                    </View>
                                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                        <ThemedText type="peque" style={{ textAlign: 'center', marginHorizontal: 25, marginBottom: 10 }} >Al comprar el boleto, será completamente tuyo</ThemedText>
                                        <Pressable style={styles.buyButton} onPress={() => handleBuy(ticket)}>
                                            <Ionicons style={styles.icon} name="ticket" />
                                            <ThemedText type="pequeBlack">Comprar boleto/s</ThemedText>
                                        </Pressable>
                                    </View>
                                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                        <ThemedText type="peque" style={{ textAlign: 'center', marginHorizontal: 40, marginBottom: 10 }}>Para alquilar el boleto deberás pagar la mitad</ThemedText>

                                        <Pressable style={styles.rentButton} onPress={() => handlePrevent(ticket)}>
                                            <Ionicons style={styles.icon} name="ticket-outline" />
                                            <ThemedText type="pequeBlack">Alquilar boleto/s</ThemedText>
                                        </Pressable>
                                    </View>

                                    <Pressable onPress={() => setModalOpen(false)} style={styles.cancelButton}>
                                        <ThemedText type="pequeBlack">Cancelar</ThemedText>
                                    </Pressable>
                                </View>
                            </ModalBuy>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    modalContent: {
        backgroundColor: '#1d1d1d',
        width: 300,
        height: 400,
        borderRadius: 30,
        alignItems: "center",
        justifyContent: 'center'
    },
    containerButton: {
        width: 350,
        height: 80,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        backgroundColor: '#2b2b2b',
        paddingHorizontal: 20,
        marginVertical: 10,
    },
    containerText: {
        width: 350,
    },
    counterContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    counterButton: {
        backgroundColor: '#2b2b2b',
        padding: 10,
        borderRadius: 15,
    },
    buyButton: {
        flexDirection: 'row',
        height: 40,
        width: 200,
        backgroundColor: '#2b2b2b',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
        borderRadius: 15,
    },
    rentButton: {
        height: 40,
        flexDirection: 'row',
        width: 200,
        backgroundColor: '#2b2b2b',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
        borderRadius: 15,
    },
    cancelButton: {
        height: 40,
        width: 200,
        backgroundColor: '#6B0000',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
    },
    icon: {
        fontSize: 20,
        color: '#B07EFF',
        marginRight: 10
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalConten: {
        width: 300,
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
    },
    input: {
        width: '100%',
        padding: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        marginBottom: 10,
        borderRadius: 5,
    },
});

export default Event;

