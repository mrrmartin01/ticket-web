export interface EventTicketType {
  id: string;
  name: string;
}

export interface EventItem {
  id: string;
  name: string;
  description: string;
  ticketsType: EventTicketType[];
  location: string;
  date: string;
  image?: string;
}

export interface EventMeta {
  nextCursor: string | null;
  hasMore: boolean;
}

export interface EventResponse {
  data: EventItem[];
  meta: EventMeta;
}
