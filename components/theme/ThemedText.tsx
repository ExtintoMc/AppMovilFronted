import { Text, type TextProps, StyleSheet } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";

export type ThemedTextProps = TextProps & {
    lightColor?: string;
    darkColor?: string;
    type?: 'default' | 'thin' | 'black' | 'peque'| 'pequeBlack'
}

export const ThemedText = ({ style, lightColor, darkColor, type = 'default', ...rest }: ThemedTextProps) => {
    const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text')

    return (
        <Text style={[
            { color },
            type === 'thin' ? styles.thin : undefined,
            type === 'default' ? styles.default : undefined,
            type === 'black' ? styles.black : undefined,
            type === 'peque' ? styles.peque : undefined,
            type === 'pequeBlack' ? styles.pequeBlack : undefined,
            style
        ]}
            {...rest}
        />
    )

}

const styles = StyleSheet.create({
    default: {
        fontSize: 20,
        fontFamily: 'Lato'
    },
    black: {
        fontSize: 20,
        fontFamily: 'LatoBlack'
    },
    peque: {
        fontSize: 14,
        fontFamily: 'Lato'
    },
    pequeBlack: {
        fontSize: 14,
        fontFamily: 'LatoBlack'
    },
    thin:{
        fontSize: 12,
        fontFamily: 'Lato'
    }
})