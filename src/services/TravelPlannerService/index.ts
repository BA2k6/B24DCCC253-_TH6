// src/services/TravelPlannerService.ts
import { v4 as uuidv4 } from 'uuid';

export type DestinationType = 'biển' | 'núi' | 'thành phố';

export interface Destination {
  id: string;
  name: string;
  type: DestinationType;
  image: string;
  rating: number;
  priceMin: number;
  priceMax: number;
  description: string;
  durationHrs: number;
  costFood: number;
  costStay: number;
  costTransport: number;
}

export interface ItineraryItem {
  destId: string;
  notes?: string;
}

export interface ItineraryDay {
  day: number;
  items: ItineraryItem[];
}

export interface Itinerary {
  id: string;
  name: string;
  days: ItineraryDay[];
  createdAt: string;
}

export interface BudgetSettings {
  total: number;
  food: number;
  stay: number;
  transport: number;
  other: number;
}

const DEST_KEY = 'travelPlanner.destinations';
const ITINERARY_KEY = 'travelPlanner.itineraries';
const BUDGET_KEY = 'travelPlanner.budgetSettings';
const ROLE_KEY = 'travelPlanner.role';

const baseDestinations: Destination[] = [
  {
    id: 'd1',
    name: 'Hạ Long',
    type: 'biển',
    image: 'https://ticotravel.com.vn/wp-content/uploads/2022/04/Bien-Ha-Long-1-1.jpg',
    rating: 4.8,
    priceMin: 1200000,
    priceMax: 3000000,
    description: 'Vịnh Hạ Long - kỳ quan thiên nhiên thế giới.',
    durationHrs: 6,
    costFood: 350000,
    costStay: 450000,
    costTransport: 250000,
  },
  // ... thêm 11 điểm
  {
    id: 'd2',
    name: 'Sapa',
    type: 'núi',
    image: 'https://images.unsplash.com/photo-1542020156084-04b3598cca8e?auto=format&fit=crop&w=1200&q=80',
    rating: 4.6,
    priceMin: 800000,
    priceMax: 2200000,
    description: 'Sapa mờ sương, ruộng bậc thang.',
    durationHrs: 8,
    costFood: 300000,
    costStay: 400000,
    costTransport: 300000,
  },
  {
    id: 'd3',
    name: 'Đà Nẵng',
    type: 'thành phố',
    image: 'https://images.unsplash.com/photo-1501167786227-4cba60f6f7e5?auto=format&fit=crop&w=1200&q=80',
    rating: 4.7,
    priceMin: 900000,
    priceMax: 2700000,
    description: 'Đà Nẵng hiện đại và vùng núi thơ mộng.',
    durationHrs: 7,
    costFood: 320000,
    costStay: 480000,
    costTransport: 280000,
  },
  // ... các destination tiếp
];

const ensureDestinations = () => {
  const existing = localStorage.getItem(DEST_KEY);
  if (!existing) localStorage.setItem(DEST_KEY, JSON.stringify(baseDestinations));
};

export const getDestinations = (): Destination[] => {
  ensureDestinations();
  return JSON.parse(localStorage.getItem(DEST_KEY) || '[]') as Destination[];
};

export const saveDestinations = (data: Destination[]) => {
  localStorage.setItem(DEST_KEY, JSON.stringify(data));
};

export const getItineraries = (): Itinerary[] => {
  const raw = localStorage.getItem(ITINERARY_KEY) || '[]';
  return JSON.parse(raw) as Itinerary[];
};

export const saveItineraries = (list: Itinerary[]) => {
  localStorage.setItem(ITINERARY_KEY, JSON.stringify(list));
};

export const getBudgetSettings = (): BudgetSettings => {
  const raw = localStorage.getItem(BUDGET_KEY);
  if (!raw) {
    const defaultSet: BudgetSettings = { total: 10000000, food: 3000000, stay: 3000000, transport: 2000000, other: 2000000 };
    localStorage.setItem(BUDGET_KEY, JSON.stringify(defaultSet));
    return defaultSet;
  }
  return JSON.parse(raw) as BudgetSettings;
};

export const saveBudgetSettings = (input: BudgetSettings) => {
  localStorage.setItem(BUDGET_KEY, JSON.stringify(input));
};

export const getUserRole = () => localStorage.getItem(ROLE_KEY) || 'user';
export const setUserRole = (role: 'admin' | 'user') => localStorage.setItem(ROLE_KEY, role);

export const createEmptyItinerary = (name = 'Lịch trình mới'): Itinerary => ({
  id: uuidv4(),
  name,
  createdAt: new Date().toISOString(),
  days: [{ day: 1, items: [] }],
});