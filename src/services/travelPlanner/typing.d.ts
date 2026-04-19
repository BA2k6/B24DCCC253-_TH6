export type DestinationCategory = 'beach' | 'mountain' | 'city';

export interface DestinationItem {
  id: string;
  name: string;
  location: string;
  category: DestinationCategory;
  imageUrl: string;
  description: string;
  rating: number;
  priceLevel: number;
  estimatedPrice: number;
  visitDurationHours: number;
  mealCost: number;
  hotelCost: number;
  transportCost: number;
  ticketCost: number;
  popularScore: number;
}

export interface TripForm {
  title: string;
  startDate: string;
  endDate: string;
  budgetLimit: number;
}

export interface FilterPayload {
  keyword?: string;
  category?: DestinationCategory;
  maxPrice?: number;
  minRating?: number;
  sortBy?: 'popular' | 'priceAsc' | 'priceDesc' | 'ratingDesc';
}