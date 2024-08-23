import { useRef } from "react";
import { Animated, Pressable, View, StyleSheet, Dimensions, Text } from "react-native"
import { Event } from "@/api/event";


const { width, height } = Dimensions.get('window');

const Carrousel = ({ images }: { images: Event[] }) => {

    const scrollAnimation = useRef(new Animated.Value(0)).current

    return (
        <View style={{ height: 400 }}>
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
                    return (
                        <Pressable style={styles.item} onPress={() => console.log(item.id)}>
                            <View>
                                <Text>Hola</Text>
                                <Animated.Image
                                source={{ uri: `https://res.cloudinary.com/dli5b9uxi/image/upload/v1723522631/${item.cover}.png` }}
                                style={[styles.images, {
                                    transform: [{
                                        translateX: scrollAnimation.interpolate({
                                            inputRange: [width * (index - 1), width * index, width * (index + 1)],
                                            outputRange: [-width * 0.8, 0, width * 0.8]
                                        })
                                    }]
                                }]}
                            />
                            <Animated.View style={[styles.titleComponent, {
                                opacity: scrollAnimation.interpolate({
                                    inputRange: [width * (index - 0.5), width * index, width * (index + 0.5)],
                                    outputRange: [0, 1, 0]
                                }),
                                transform: [{
                                    translateX: scrollAnimation.interpolate({
                                        inputRange: [width * (index - 0.5), width * index, width * (index + 0.5)],
                                        outputRange: [250, 0, -250]
                                    })
                                }]
                            }
                            ]}>
                                <Text style={styles.title}>{item.title}</Text>
                            </Animated.View>
                            </View>
                        </Pressable>
                    );
                }}
            />

        </View>
    )
}

const styles = StyleSheet.create({
    item: {
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
        width,
        height: 400
    },
    images: {
        width,
        height: height * 0.44,
        resizeMode: 'cover'
    },
    titleComponent: {
        position: 'absolute',
        bottom: 20
    },
    title: {
        fontSize: 24,
        color: 'white'
    }
});

export default Carrousel