import axios from './axios'

export interface Event {
    id?: string;
    title: string;
    desc: string;
    cover: string;
    date: string;
    location: string;
    status: string;
    userId: string;
}

export interface Likes {
    userId: string;
    eventId: string;
}

export const getEventsRequest = () => axios.get('/events')
export const getFamousEventsRequest = () => axios.get('/popularEvents')

export const getEventRequest = (id: string) => axios.get(`/events/${id}`)
export const getEventByUserRequest = (userId: string) => axios.get(`/events/user/${userId}`)

export const getLikesEventRequest = (userId: string) => axios.get(`/likes/${userId}`)
export const likeEventRequest = (likes: Likes) => axios.post('/likes', likes)
export const unlikeEventRequest = (likes: Likes) => axios.post('/unlikes', likes)

export const getTicketsByEvent = (eventId?: string) => axios.get(`/tickets/${eventId}`)
export const getTicketsByUser = (userId?: string) => axios.get(`/tickets/user/${userId}`)
export const createTicketByEvent = (ticket: any) => axios.post('/tickets', ticket)

export const purchaseTicket = (ticket: any) => axios.post('/purchase', ticket)