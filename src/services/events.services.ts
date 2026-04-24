import { httpClient } from "@/lib/axios/httpClient";

// Get all events
export const getEvents = async () => {
  try {
    const response = await httpClient.get('/events');
    return response;
  } catch (error) {
    console.error('Failed to fetch events:', error);
    throw error;
  }
};

// Get event by ID
export const getEventById = async (id: string) => {
  try {
    const response = await httpClient.get(`/events/${id}`);
    return response;
  } catch (error) {
    console.error(`Failed to fetch event ${id}:`, error);
    throw error;
  }
};

// Create event (if needed for client-side)
export const createEvent = async (eventData: any) => {
  try {
    const response = await httpClient.post('/events', eventData);
    return response;
  } catch (error) {
    console.error('Failed to create event:', error);
    throw error;
  }
};

// Update event
export const updateEvent = async (id: string, eventData: any) => {
  try {
    const response = await httpClient.put(`/events/${id}`, eventData);
    return response;
  } catch (error) {
    console.error(`Failed to update event ${id}:`, error);
    throw error;
  }
};

// Delete event
export const deleteEvent = async (id: string) => {
  try {
    const response = await httpClient.delete(`/events/${id}`);
    return response;
  } catch (error) {
    console.error(`Failed to delete event ${id}:`, error);
    throw error;
  }
};