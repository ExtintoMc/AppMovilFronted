import { useState } from "react";
import { StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

const Map = () => {

    const [origin, setOrigin] = useState({
        latitude: 24.033579,
        longitude: -104.639415
    })

    const [destination, setDestination] = useState({
        latitude: 34.034985,
        longitude: -104.640772
    })

    return (
        <View style={{ flex: 1 }}>
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: origin.latitude,
                    longitude: origin.longitude,
                    latitudeDelta: 0.09,
                    longitudeDelta: 0.4
                }}
            >
                <Marker
                    coordinate={origin}
                />
            </MapView>
        </View>
    )
}

const styles = StyleSheet.create({
    map: {
        width: '100%',
        height: '100%',
    }
})

export default Map