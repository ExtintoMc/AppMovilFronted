import { Image, useColorScheme } from "react-native"
import { View } from "react-native"

const Logo = ({ style }: any) => {

    const colorScheme = useColorScheme()

    return (
        <View>
            {colorScheme === 'dark' ? (
                <Image source={require('../../assets/images/logo/logo1.png')} style={[style]} />
            ) : (
                <Image source={require('../../assets/images/logo/logo.png')} style={[style]} />
            )}
        </View>
    )
}

export default Logo