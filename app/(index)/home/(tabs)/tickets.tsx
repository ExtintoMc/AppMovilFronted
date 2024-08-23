import { getTicketsByUser } from "@/api/event";
import { ThemedText } from "@/components/theme/ThemedText";
import { ThemedTitle } from "@/components/theme/ThemedTitle";
import { useAuth } from "@/context/AuthContext";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text, Pressable, FlatList, ActivityIndicator, StyleSheet } from "react-native";

const Tickets = () => {
    const { userState } = useAuth();
    const [tickets, setTickets] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchTickets = async () => {
        try {
            const res = await getTicketsByUser(`${userState?.id}`);
            setTickets(res.data);
            console.log(res.data);
        } catch (error) {
            console.error("Error fetching tickets:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchTickets();
    }, []);

    if (isLoading) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color="#B07EFF" />
            </View>
        );
    }

    console.log(tickets)

    return (
        <View style={styles.container}>
            <ThemedTitle type="titulo3" >Mis tickets</ThemedTitle>
            <FlatList
                data={tickets}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <Link asChild href={'/home/comprar'}>
                        <Pressable style={styles.ticketContainer}>
                            <ThemedText style={styles.ticketText}>Quantity: {item.quantity}</ThemedText>
                            <ThemedText style={styles.ticketText}>Price: {item.ticket?.price || 'N/A'}</ThemedText>
                            <ThemedText style={styles.ticketText}>Status: {item.status}</ThemedText>
                            <ThemedText style={styles.ticketText}>Created At: {new Date(item.createdAt).toLocaleString()}</ThemedText>
                        </Pressable>
                    </Link>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 40,
        alignItems: 'center',
    },
    loaderContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    ticketContainer: {
        backgroundColor: '#1a1a1a',
        padding: 15,
        marginVertical: 10,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    ticketText: {
        fontSize: 16,
        marginBottom: 5,
    },
});

export default Tickets;
