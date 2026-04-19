import type {
  DestinationItem,
  FilterPayload,
  TripForm,
} from '@/services/travelPlanner/typing';

export interface PlannedDestination extends DestinationItem {
  orderIndex: number;
  estimatedTravelTime: number;
}

export interface DayPlan {
  dayNumber: number;
  dateLabel: string;
  items: PlannedDestination[];
}

export interface BudgetState {
  budgetLimit: number;
  totalSpent: number;
  remaining: number;
  percentUsed: number;
  categories: {
    meal: number;
    hotel: number;
    transport: number;
    ticket: number;
    other: number;
  };
}

export interface TravelPlannerState {
  destinations: DestinationItem[];
  filteredDestinations: DestinationItem[];
  filters: FilterPayload;
  tripForm: TripForm;
  dayPlans: DayPlan[];
  selectedDay: number;
  budget: BudgetState;
  dashboard: {
    totalTrips: number;
    totalRevenue: number;
    topDestination: string;
    avgBudget: number;
    monthlyTrips: Array<{ month: string; value: number }>;
    categoryBudget: Array<{ type: string; value: number }>;
    destinationPopularity: Array<{ name: string; count: number }>;
    weeklyBudget: Array<{ day: string; value: number }>;
  };
}