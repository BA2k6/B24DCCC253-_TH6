import type { BudgetState, DayPlan } from './types';

export function calculateBudget(
  dayPlans: DayPlan[],
  budgetLimit: number,
): BudgetState {
  const initial = {
    meal: 0,
    hotel: 0,
    transport: 0,
    ticket: 0,
    other: 0,
  };

  const categories = dayPlans.reduce((acc, day) => {
    day.items.forEach((item) => {
      acc.meal += item.mealCost;
      acc.hotel += item.hotelCost;
      acc.transport += item.transportCost;
      acc.ticket += item.ticketCost;
      acc.other += item.estimatedTravelTime * 1000;
    });
    return acc;
  }, initial);

  const totalSpent =
    categories.meal +
    categories.hotel +
    categories.transport +
    categories.ticket +
    categories.other;

  const remaining = budgetLimit - totalSpent;
  const percentUsed =
    budgetLimit > 0
      ? Math.min(100, Math.round((totalSpent / budgetLimit) * 100))
      : 0;

  return {
    budgetLimit,
    totalSpent,
    remaining,
    percentUsed,
    categories,
  };
}

export function buildBudgetPieData(budget: BudgetState) {
  return [
    { type: 'Ăn uống', value: budget.categories.meal },
    { type: 'Lưu trú', value: budget.categories.hotel },
    { type: 'Di chuyển', value: budget.categories.transport },
    { type: 'Vé tham quan', value: budget.categories.ticket },
    { type: 'Phát sinh', value: budget.categories.other },
  ];
}