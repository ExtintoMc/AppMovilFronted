import Ionicons from "@expo/vector-icons/Ionicons";
import { Pressable, View, StyleSheet, TextStyle, ViewStyle } from "react-native";
import { ThemedText } from "../theme/ThemedText";

interface BuyButtonProps {
    type: string;
    price?: string; // Elimina si no se usa
    avalible: string; // Corrige el nombre de la propiedad a "available" si es un error de tipografía
}

const BuyButton = ({ type, price, avalible }: BuyButtonProps) => {

    console.log(type, price, avalible)

    return (
        <View style={styles.containerButton}>
            <View style={styles.rowContainer}>
                <View style={styles.iconContainer}>
                    <Ionicons style={styles.icon} name="cash-outline" />
                </View>
                <Pressable>
                    <ThemedText type="black" >
                        {type}
                    </ThemedText>
                    <ThemedText type="peque">
                        Disponibles {avalible}
                    </ThemedText>
                </Pressable>
            </View>
            <View>
                <Ionicons style={styles.chevronIcon} name="chevron-forward" />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    containerButton: {
        width: 350,
        height: 80,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        backgroundColor: '#2b2b2b',
        paddingHorizontal: 20,

    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconContainer: {
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#2B2B2B',
        borderRadius: 100,
        marginRight: 15
    },
    icon: {
        fontSize: 25,
        color: '#B07EFF'
    },
    chevronIcon: {
        color: 'white',
        fontSize: 20
    }
});

export default BuyButton;
