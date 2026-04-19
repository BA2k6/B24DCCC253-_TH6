import type { DestinationItem } from '@/services/travelPlanner/typing';
import type { DayPlan, PlannedDestination } from './types';

export function createInitialDayPlans(
  startDate: string,
  endDate: string,
): DayPlan[] {
  if (!startDate || !endDate) return [];

  const start = new Date(startDate);
  const end = new Date(endDate);

  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) return [];
  if (start > end) return [];

  const result: DayPlan[] = [];
  let dayNumber = 1;

  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    result.push({
      dayNumber,
      dateLabel: new Date(d).toLocaleDateString('vi-VN'),
      items: [],
    });
    dayNumber += 1;
  }

  return result;
}

export function estimateTravelTime(
  prev?: DestinationItem,
  next?: DestinationItem,
) {
  if (!prev || !next) return 0;
  if (prev.location === next.location) return 20;
  if (prev.category === next.category) return 40;
  return 75;
}

export function addDestinationToDay(
  dayPlans: DayPlan[],
  dayNumber: number,
  destination: DestinationItem,
): DayPlan[] {
  return dayPlans.map((day) => {
    if (day.dayNumber !== dayNumber) return day;

    const existed = day.items.some((item) => item.id === destination.id);
    if (existed) return day;

    const prev = day.items[day.items.length - 1];

    const newItem: PlannedDestination = {
      ...destination,
      orderIndex: day.items.length + 1,
      estimatedTravelTime: estimateTravelTime(prev, destination),
    };

    return {
      ...day,
      items: [...day.items, newItem],
    };
  });
}

export function removeDestinationFromDay(
  dayPlans: DayPlan[],
  dayNumber: number,
  destinationId: string,
): DayPlan[] {
  return dayPlans.map((day) => {
    if (day.dayNumber !== dayNumber) return day;

    const items = day.items.filter((item) => item.id !== destinationId);

    const normalized = items.map((item, index) => ({
      ...item,
      orderIndex: index + 1,
      estimatedTravelTime:
        index === 0 ? 0 : estimateTravelTime(items[index - 1], item),
    }));

    return {
      ...day,
      items: normalized,
    };
  });
}

export function moveDestination(
  dayPlans: DayPlan[],
  dayNumber: number,
  fromIndex: number,
  toIndex: number,
): DayPlan[] {
  return dayPlans.map((day) => {
    if (day.dayNumber !== dayNumber) return day;

    if (
      fromIndex < 0 ||
      toIndex < 0 ||
      fromIndex >= day.items.length ||
      toIndex >= day.items.length
    ) {
      return day;
    }

    const clone = [...day.items];
    const [moved] = clone.splice(fromIndex, 1);
    clone.splice(toIndex, 0, moved);

    const normalized = clone.map((item, index) => ({
      ...item,
      orderIndex: index + 1,
      estimatedTravelTime:
        index === 0 ? 0 : estimateTravelTime(clone[index - 1], item),
    }));

    return {
      ...day,
      items: normalized,
    };
  });
}