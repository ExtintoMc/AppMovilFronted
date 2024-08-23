import { Text, type TextProps, StyleSheet } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";

export type ThemedTextProps = TextProps & {
    lightColor?: string;
    darkColor?: string;
    type?: 'default' | 'titulo1' | 'titulo2' | 'titulo3' | 'titulo4'
}

export const ThemedTitle = ({ style, lightColor, darkColor, type = 'default', ...rest }: ThemedTextProps) => {
    const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text')

    return (
        <Text style={[
            { color },
            type === 'default' ? styles.default : undefined,
            type === 'titulo1' ? styles.titulo1 : undefined,
            type === 'titulo2' ? styles.titulo2 : undefined,
            type === 'titulo3' ? styles.titulo3 : undefined,
            type === 'titulo4' ? styles.titulo4 : undefined,
            style
        ]}
            {...rest}
        />
    )

}

const styles = StyleSheet.create({
    default: {
        fontSize: 60,
        fontFamily: 'Mukta'
    },
    titulo1: {
        fontSize: 60,
        fontFamily: 'WorkSans'
    },
    titulo2: {
        fontSize: 60
    },
    titulo3: {
        fontSize: 30,
        fontFamily: 'WorkSans'
    },
    titulo4: {
        fontSize: 20,
        fontFamily: 'Mukta'
    }
})