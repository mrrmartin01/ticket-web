export interface TicketType {
  id: string;
  name: string;
  price: number;
  currency: string;
  group: boolean;
  badge: string | null;
  features: string[];
  totalQuantity: number;
  quantityAvailable: number;
}

export interface EventDetails {
  id: string;
  name: string;
  description: string;
  imageSrc: string;

  location: {
    formatted: string;
    lat: number;
    lng: number;
  };

  date: {
    start: string;
    end?: string;
    readable?: string;
  };

  duration: string;

  capacity: {
    current: number;
    total: number;
  };

  ticketsType: TicketType[];
}
