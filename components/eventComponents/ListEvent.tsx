import { FlatList, Image, View, StyleSheet, Pressable, Animated, ActivityIndicator } from "react-native";
import { ThemedText } from "../theme/ThemedText";
import { Evento } from "@/context/EventContext";
import { Link } from "expo-router";
import { ThemedTitle } from "../theme/ThemedTitle";
import { getLikesEventRequest, likeEventRequest, unlikeEventRequest } from "@/api/event";
import { useEffect, useRef, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

const ListEvent = ({ event, userId }: { event: Evento[], userId: string }) => {

    const scrollAnimation = useRef(new Animated.Value(0)).current;
    const scaleAnimation = useRef(new Animated.Value(1)).current;

    const [likedItems, setLikedItems] = useState<{ [key: string]: boolean }>({});
    const [isLoading, setIsLoading] = useState(true);

    const likes = async () => {
        const res = await getLikesEventRequest(userId);
        if (res.data.length > 0) {
            res.data.forEach((item: { id: string }) => {
                const isLiked = likedItems[item.id];

                setLikedItems(prev => ({
                    ...prev,
                    [item.id]: !isLiked,
                }));
            });
        }
    };

    const toggleLike = (id: string) => {
        const isLiked = likedItems[id];

        console.log(isLiked);

        if (isLiked) {
            console.log('isLiked')
            unlikeEventRequest({ userId, eventId: id });
        } else {
            console.log('no isLiked')
            likeEventRequest({ userId, eventId: id });
        }

        Animated.sequence([
            Animated.timing(scaleAnimation, {
                toValue: 1.5,
                duration: 150,
                useNativeDriver: true,
            }),
            Animated.timing(scaleAnimation, {
                toValue: 1,
                duration: 150,
                useNativeDriver: true,
            }),
        ]).start();

        setLikedItems(prev => ({
            ...prev,
            [id]: !isLiked,
        }));
    };

    useEffect(() => {
        const loadData = async () => {
            try {
                await Promise.all([likes()]);
            } finally {
                setIsLoading(false);
            }
        };

        loadData();
    }, []);

    if (isLoading) {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <ActivityIndicator size={"large"} />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={event}
                bounces={false}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item, index }) => {
                    if (!item.id) return null
                    const isLiked = likedItems[item.id];

                    return (
                        <Link asChild href={`/home/${item.id}`}>
                            <Pressable style={{ height: 150, width: 350, backgroundColor: '#2b2b2b', flexDirection: 'row', marginBottom: 20, borderRadius: 30 }}>
                                <View style={{ height: 150, width: 150, alignItems: 'center', justifyContent: 'center' }}>
                                    <Image style={styles.images} source={{ uri: `https://res.cloudinary.com/dli5b9uxi/image/upload/v1723522631/${item.cover}.png` }} />
                                    <Image blurRadius={20} style={styles.imagesBlur} source={{ uri: `https://res.cloudinary.com/dli5b9uxi/image/upload/v1723522631/${item.cover}.png` }} />
                                </View>
                                <View style={{ justifyContent: 'center', marginLeft: 10 }}>
                                    <ThemedText type="pequeBlack">
                                        {item.title.length > 20 ? `${item.title.substring(0, 20)}...` : item.title}
                                    </ThemedText>
                                    <ThemedText style={{ marginBottom: 10 }} type="peque">{item.location}</ThemedText>
                                    <View style={{ backgroundColor: '#024900', width: 50, height: 20, borderRadius: 50, justifyContent: 'center', alignItems: 'center' }} >
                                        <ThemedText type="thin">{item.status}</ThemedText>
                                    </View>
                                </View>
                                <View style={{ alignItems: 'center', justifyContent: 'center', position: 'absolute', right: 0, height: 150, padding: 20 }}>
                                    <Pressable
                                        style={styles.heartContainer}
                                        onPress={() => toggleLike(item.id!)}
                                    >
                                        <Animated.View style={{ transform: [{ scale: scaleAnimation }] }}>
                                            <Ionicons
                                                style={[styles.heart, { color: isLiked ? '#FF6868' : '#B07EFF' }]}
                                                name={isLiked ? "heart" : "heart-outline"}
                                            />
                                        </Animated.View>
                                    </Pressable>
                                </View>
                            </Pressable>
                        </Link>
                    )
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
    },
    images: {
        resizeMode: 'contain',
        width: 150,
        height: 150,
        borderRadius: 30

    },
    imagesBlur: {
        position: 'absolute',
        zIndex: -1,
        resizeMode: 'cover',
        width: 150,
        height: 150,
        opacity: 0.3,
        borderRadius: 30
    },
    heartContainer: {
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        backgroundColor: '#1a1a1a',
    },
    icon: {
        fontSize: 20,
        paddingRight: 10,
        color: '#B07EFF',
    },
    heart: {
        fontSize: 20,
    }
})

export default ListEvent