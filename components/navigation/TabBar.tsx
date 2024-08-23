import { View, Text, StyleSheet, LayoutChangeEvent } from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import TabBarButton from "./TabBarButton";
import { useState } from "react";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";

const TabBar = ({ state, descriptors, navigation }: BottomTabBarProps) => {

    const [dimensions, setDimensions] = useState({ height: 20, width: 100 })
    const buttonWidth = dimensions.width / state.routes.length

    const onTabbarLayout = (e: LayoutChangeEvent) => {
        setDimensions({
            height: e.nativeEvent.layout.height,
            width: e.nativeEvent.layout.width
        })
    }

    const tabPositionX = useSharedValue(0)

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{
                translateX: tabPositionX.value
            }]
        }
    })

    return (
        <View onLayout={onTabbarLayout} style={styles.tabBar}>
            <Animated.View style={[{
                position: 'absolute',
                backgroundColor: '#B07EFF',
                borderRadius: 30,
                marginHorizontal: 20,
                height: dimensions.height - 25,
                width: buttonWidth - 40
            }, animatedStyle]} />
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];

                const label =
                    typeof options.tabBarLabel === 'string'
                        ? options.tabBarLabel
                        : typeof options.tabBarLabel === 'function'
                            ? options.tabBarLabel({ focused: state.index === index, color: '', position: 'below-icon', children: '' })?.toString()
                            : typeof options.title === 'string'
                                ? options.title
                                : route.name;

                const isFocused = state.index === index;

                const onPress = () => {
                    tabPositionX.value = withSpring(buttonWidth * index, { duration: 1500 })
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name, route.params);
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };

                return (
                    <TabBarButton
                        key={route.name}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        isFocused={isFocused}
                        routerName={route.name}
                        color={isFocused ? '#1a1a1a' : '#B07EFF'}
                        label={label as string} // Ensure label is passed as a string
                    />
                );
            })}
        </View>
    )
}

const styles = StyleSheet.create({
    tabBar: {
        position: 'absolute',
        bottom: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#1d1d1d',
        marginHorizontal: 20,
        paddingVertical: 15,
        borderRadius: 35,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 10 },
        shadowRadius: 10,
        shadowOpacity: 0.5,
        elevation: 5
    }
})

export default TabBar;
