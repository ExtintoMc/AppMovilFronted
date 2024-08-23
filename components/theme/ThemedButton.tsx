import { Pressable, type PressableProps, StyleSheet } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";

export type ThemedPressableProps = PressableProps & {
    darkColor?: string
    lightColor?: string
    type?: 'default' | 'secundario' | 'semibold'
}

export const ThemedButton = ({ style, lightColor, darkColor, type = 'default', ...rest }: ThemedPressableProps) => {

    const color = useThemeColor({ light: lightColor, dark: darkColor }, 'tint')

    return (
        <Pressable
            style={[
                type === 'default' && { ...styles.default, backgroundColor: color },
                type === 'secundario' && { ...styles.secundario, borderColor: color },
            ]}
            {...rest}
        />
    )

}

const styles = StyleSheet.create({
    default: {
        width: 300,
        height: 50,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5
    },
    secundario: {
        width: 300,
        height: 50,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 0.5,
        margin: 5,
    }
})