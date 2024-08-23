import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { Image, Pressable, View, StyleSheet, Text } from "react-native";
import { ThemedText } from "../theme/ThemedText";

const TopBar = ({ cover, }: any) => {


    return (
        <View style={styles.container}>
            <Image
                style={styles.image}
                height={400}
                source={{ uri: `https://res.cloudinary.com/dli5b9uxi/image/upload/v1723522631/${cover}.png` }}
            />
            <Image
                blurRadius={20}
                style={styles.imageBlur}
                height={400}
                source={{ uri: `https://res.cloudinary.com/dli5b9uxi/image/upload/v1723522631/${cover}.png` }}
            />
            <Link asChild href={'/home'}>
                <Pressable style={styles.iconContainer}>
                    <Ionicons
                        style={styles.icon}
                        name="chevron-back-outline"
                    />
                </Pressable>
            </Link>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 380,
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    image: {
        position: 'absolute',
        resizeMode: 'contain',
        height: 380,
        width: '100%'
    },
    imageBlur: {
        position: 'absolute',
        resizeMode: 'cover',
        height: 380,
        width: '100%',
        zIndex: -1,
        opacity: 0.3
    },
    iconContainer: {
        marginTop: 40,
        marginHorizontal: 20,
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        backgroundColor: '#2B2B2B',
    },
    icon: {
        fontSize: 20,
        color: '#B07EFF',
    },
    avalible: {
        position: 'absolute',
        bottom: 10,
        right: 30,
        width: 80,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    quantity: {
        alignItems: 'center',
        height: 30,
        width: 80,
        borderRadius: 50,
        justifyContent: 'center',
    }
})

export default TopBar;
