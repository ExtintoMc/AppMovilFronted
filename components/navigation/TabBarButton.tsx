import { Ionicons } from "@expo/vector-icons";
import { useEffect } from "react";
import { StyleSheet, Pressable, GestureResponderEvent } from "react-native";
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";

interface TabBarButtonProps {
    onPress: (event: GestureResponderEvent) => void;
    onLongPress: (event: GestureResponderEvent) => void;
    isFocused: boolean;
    routerName: string;
    color: string;
    label: string;
}

const TabBarButton = ({ onPress, onLongPress, isFocused, routerName, color, label }: TabBarButtonProps) => {

    const icon = {
        index: (props: any) => <Ionicons style={styles.tabIcon} {...props} name={isFocused ? "home" : "home-outline"} />,
        tickets: (props: any) => <Ionicons style={styles.tabIcon} {...props} name={isFocused ? "ticket" : "ticket-outline"} />,
        buscar: (props: any) => <Ionicons style={styles.tabIcon} {...props} name={isFocused ? "search" : "search-outline"} />,
        perfil: (props: any) => <Ionicons style={styles.tabIcon} {...props} name={isFocused ? "person" : "person-outline"} />
    }

    const IconComponent = icon[routerName as keyof typeof icon];

    const scale = useSharedValue(0)

    useEffect(() => {
        scale.value = withSpring(typeof isFocused === 'boolean' ? (isFocused ? 1 : 0) : isFocused, { duration: 500 })
    }, [scale, isFocused])

    const animatedIconStyle = useAnimatedStyle(() => {
        const scaleValue = interpolate(scale.value, [0, 1], [1, 1.5])
        const top = interpolate(scale.value, [0, 1], [0, 12])
        return {
            transform: [{
                scale: scaleValue
            }],
            top
        }
    })

    const animatedTextStyle = useAnimatedStyle(() => {
        const opacity = interpolate(scale.value, [1, 0], [0, 1])
        return { opacity }
    })

    return (
        <Pressable
            key={routerName}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.TabBarItem}
        >
            <Animated.View style={animatedIconStyle}>
                {
                    IconComponent && IconComponent({
                        color: color
                    })
                }
            </Animated.View>
            <Animated.Text style={[{ color: color }, animatedTextStyle]}>
                {typeof label === 'string' ? label : null}
            </Animated.Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    TabBarItem: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5,
    },
    tabIcon: {
        fontSize: 20,
    },
});

export default TabBarButton;
