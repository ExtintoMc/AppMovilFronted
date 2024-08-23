import React, { createContext, useContext, useEffect, useState } from "react";
import { Event, getEventRequest, getEventsRequest, getTicketsByEvent } from "@/api/event";
import axios from "axios";

export interface Ticket {
    id: string;
    type: string;
    quantity: string;
    available: string;
    price: string;
}

export interface Evento extends Event {
    tickets: Ticket[];
}

interface EventProps {
    event?: Evento;
    events?: Evento[];
    onGetEvents?: () => Promise<Evento[]>;
    onGetEventById?: (id: string) => Promise<Evento | undefined>;
    onCreateEvent?: (event: Event) => Promise<Evento>;
    onUpdateEvent?: (id: string, updatedEvent: Event) => Promise<Evento | undefined>;
    onDeleteEvent?: (id: string) => Promise<void>;
}

export const EventContext = createContext<EventProps>({});

export const useEvent = () => {
    const context = useContext(EventContext);
    if (!context) {
        throw new Error("useEvent must be used within an EventProvider");
    }
    return context;
}

export const EventProvider = ({ children }: { children: React.ReactNode }) => {
    const [events, setEvents] = useState<Evento[]>([]);
    const [event, setEvent] = useState<Evento | undefined>(undefined);

    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const formatEvent = async (event: Event): Promise<Evento> => {
        try {
            const ticketsRes = await getTicketsByEvent(event.id);
            const ticketsData = Array.isArray(ticketsRes.data) ? ticketsRes.data : [];

            const tickets: Ticket[] = ticketsData.map((ticket: any) => ({
                id: ticket.id,
                type: ticket.nombre,
                quantity: ticket.quantity,
                available: ticket.available,
                price: ticket.price,
            }));

            return {
                ...event,
                date: formatDate(event.date),
                tickets,
            };
        } catch (error) {
            console.error('Error formatting event:', error);
            return {
                ...event,
                date: formatDate(event.date),
                tickets: [],
            };
        }
    };


    const getEvents = async (): Promise<Evento[]> => {
        const res = await getEventsRequest();
        const formattedEvents = await Promise.all(res.data.map(formatEvent));
        setEvents(formattedEvents);
        return formattedEvents;
    };

    const getEventById = async (id: string): Promise<Evento | undefined> => {
        const res = await getEventRequest(id);
        const formattedEvent = await formatEvent(res.data);
        setEvent(formattedEvent);
        return formattedEvent;
    };

    const createEvent = async (newEvent: Event): Promise<Evento> => {
        try {
            const formData = new FormData();
            formData.append('title', newEvent.title);
            formData.append('desc', newEvent.desc);
            formData.append('date', new Date(newEvent.date).toISOString());
            formData.append('location', newEvent.location);
            formData.append('status', newEvent.status);
            formData.append('userId', newEvent.userId);

            if (newEvent.cover) {
                const res = await fetch(newEvent.cover);
                const blob = await res.blob();
                formData.append('cover', {
                    uri: newEvent.cover,
                    type: blob.type,
                    name: 'event.png'
                } as any);
            }

            const res = await axios.post('http://192.168.1.135:3000/api/events', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });

            const event = await formatEvent(res.data);
            setEvents(prev => [...prev, event]);
            return event;
        } catch (error) {
            console.error('Error creating event:', error);
            throw error;
        }
    };


    const updateEvent = async (id: string, updatedEvent: Event): Promise<Evento | undefined> => {
        const formattedEvent = await formatEvent(updatedEvent);
        const updatedEvents = events.map(event => (event.id === id ? formattedEvent : event));
        setEvents(updatedEvents);
        return formattedEvent;
    };

    const deleteEvent = async (id: string): Promise<void> => {
        const filteredEvents = events.filter(event => event.id !== id);
        setEvents(filteredEvents);
    };

    useEffect(() => {
        getEvents();
    }, []);

    const value: EventProps = {
        event,
        events,
        onGetEvents: getEvents,
        onGetEventById: getEventById,
        onCreateEvent: createEvent,
        onUpdateEvent: updateEvent,
        onDeleteEvent: deleteEvent,
    };

    return (
        <EventContext.Provider value={value}>
            {children}
        </EventContext.Provider>
    );
};
