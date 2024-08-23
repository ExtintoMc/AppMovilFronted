import { View, Pressable } from "react-native"
import { ThemedText } from "../ThemedText"

const Buttons = () => {
    return (
        <View style={{ justifyContent: "center", alignItems: 'center' }}>
            <Pressable style={{ width: 300, height: 50, backgroundColor: '#fff', borderRadius: 50, justifyContent: "center", alignItems: "center" }} >
                <ThemedText>Login</ThemedText>
            </Pressable>
            <Pressable style={{ width: 300, height: 50, borderColor: '#dadada', borderWidth: 0.5, borderRadius: 50, justifyContent: "center", alignItems: "center" }} >
                <ThemedText>Register</ThemedText>
            </Pressable>
        </View>
    )
}

export default Buttons