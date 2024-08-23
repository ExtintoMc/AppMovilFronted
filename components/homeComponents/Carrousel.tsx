import { useState, useRef, useEffect } from "react";
import { Animated, Pressable, View, StyleSheet, ActivityIndicator } from "react-native";
import { getLikesEventRequest, likeEventRequest, unlikeEventRequest } from "@/api/event";
import { Ionicons } from "@expo/vector-icons";
import { ThemedText } from "../ThemedText";
import { Link } from "expo-router";
import { Evento } from "@/context/EventContext";

const Carrousel = ({ images, userId }: { images: Evento[], userId: string }) => {
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
            <Animated.FlatList
                data={images}
                bounces={false}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollAnimation } } }],
                    { useNativeDriver: true }
                )}
                renderItem={({ item, index }) => {
                    if (!item.id) return null;

                    const isLiked = likedItems[item.id];

                    return (
                        <Link asChild href={`/home/${item.id}`}>
                            <Pressable style={styles.item}>
                                <Animated.Image
                                    source={{ uri: `https://res.cloudinary.com/dli5b9uxi/image/upload/v1723522631/${item.cover}.png` }}
                                    style={[styles.images, {
                                        transform: [{
                                            translateX: scrollAnimation.interpolate({
                                                inputRange: [350 * (index - 1), 350 * index, 350 * (index + 1)],
                                                outputRange: [-350 * 0.8, 0, 350 * 0.8]
                                            })
                                        }]
                                    }]}
                                />
                                <Animated.Image
                                    blurRadius={20}
                                    source={{ uri: `https://res.cloudinary.com/dli5b9uxi/image/upload/v1723522631/${item.cover}.png` }}
                                    style={[styles.imagesblur, {
                                        transform: [{
                                            translateX: scrollAnimation.interpolate({
                                                inputRange: [350 * (index - 1), 350 * index, 350 * (index + 1)],
                                                outputRange: [-350 * 0.8, 0, 350 * 0.8]
                                            })
                                        }]
                                    }]}
                                />
                                <View>
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
                                <View style={{ width: 320 }}>
                                    <ThemedText type="subtitle">{item.title}</ThemedText>
                                    <View style={{ flexDirection: "row", alignItems: 'center', paddingTop: 4 }}>
                                        <Ionicons style={styles.icon} name={"calendar"} />
                                        <ThemedText type="link">{item.date}</ThemedText>
                                    </View>
                                    <View style={{ flexDirection: "row", alignItems: 'center', justifyContent: 'space-between' }}>
                                        <View style={{ flexDirection: "row", alignItems: 'center' }}>
                                            <Ionicons style={styles.icon} name={"navigate-circle"} />
                                            <ThemedText type="link">{item.location}</ThemedText>
                                        </View>
                                        <View style={{ flexDirection: "row", alignItems: 'center' }}>
                                            <Ionicons style={styles.icon} name={"cash-outline"} />
                                            <ThemedText type="link">{`${item.price} $`}</ThemedText>
                                        </View>
                                    </View>
                                </View>
                            </Pressable>
                        </Link>
                    );
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
        height: 500,
        width: 350,
    },
    images: {
        position: 'absolute',
        resizeMode: 'contain',
        width: 350,
        height: 380,
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20,
    },
    imagesblur: {
        position: 'absolute',
        resizeMode: 'cover',
        width: 350,
        height: 380,
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20,
        zIndex: -1,
        opacity: 0.3
    },
    item: {
        position: 'relative',
        overflow: 'hidden',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        height: 500,
        width: 350,
        padding: 20,
        borderColor: '#1a1a1a',
        borderWidth: 1,
    },
    heartContainer: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        backgroundColor: '#2B2B2B',
    },
    icon: {
        fontSize: 20,
        paddingRight: 10,
        color: '#B07EFF',
    },
    heart: {
        fontSize: 24,
    }
});

export default Carrousel;
