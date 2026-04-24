// types/event.types.ts

export interface Event {
  id: number;
  title: string;
  description: string;
  date: string; // ISO date string
  time: string;
  venue: string;
  isPublic: boolean;
  fee: number;
  image?: string;
  creatorId: number;
  creator?: {
    id: number;
    name: string;
    email: string;
  };
  participations?: {
    id: number;
    userId: number;
  }[];
  reviews?: {
    id: number;
    rating: number;
  }[];
  createdAt?: string;
  updatedAt?: string;
}

export interface EventResponse {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  venue: string;
  isPublic: boolean;
  fee: number;
  image?: string;
  creator: {
    id: number;
    name: string;
    email: string;
  };
  participantCount: number;
  reviewsCount: number;
}

export interface CreateEventInput {
  title: string;
  description: string;
  date: string;
  time: string;
  venue: string;
  isPublic: boolean;
  fee: number;
  image?: string;
}

export interface UpdateEventInput {
  title?: string;
  description?: string;
  date?: string;
  time?: string;
  venue?: string;
  isPublic?: boolean;
  fee?: number;
  image?: string;
}

export interface FilterEventsInput {
  search?: string;
  isPublic?: boolean;
  fee?: number;
  date?: string;
  creatorId?: number;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}


export interface EventsListResponse {
  data: EventResponse[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export  interface EventOwnerControlsProps {
  eventData: {
    id: number;
    title: string;
    creatorId: number;
  };
}