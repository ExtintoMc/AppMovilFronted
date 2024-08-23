import { getEventByUserRequest } from "@/api/event";
import ListEvent from "@/components/eventComponents/ListEvent";
import { ThemedText } from "@/components/ThemedText";
import { useAuth } from "@/context/AuthContext";
import { useEvent } from "@/context/EventContext";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const MisEventos = () => {

    const [eventosByUser, setEventByUser] = useState([])
    const { userState } = useAuth()

    const getEvents = async () => {
        const res = await getEventByUserRequest(`${userState?.id}`)
        setEventByUser(res.data)
    }

    useEffect(() => {
        getEvents()
    }, [])

    console.log(eventosByUser)

    return (
        <SafeAreaView>
            <ListEvent event={eventosByUser} userId={`${userState?.id}`} />
        </SafeAreaView>
    )
}

export default MisEventos