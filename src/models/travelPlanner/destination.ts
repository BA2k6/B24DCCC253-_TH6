import type {
  DestinationItem,
  FilterPayload,
} from '@/services/travelPlanner/typing';

export function applyDestinationFilters(
  list: DestinationItem[],
  filters: FilterPayload,
): DestinationItem[] {
  let result = [...list];

  if (filters.keyword) {
    const keyword = filters.keyword.toLowerCase().trim();
    result = result.filter(
      (item) =>
        item.name.toLowerCase().includes(keyword) ||
        item.location.toLowerCase().includes(keyword),
    );
  }

  if (filters.category) {
    result = result.filter((item) => item.category === filters.category);
  }

  if (filters.maxPrice) {
    result = result.filter(
      (item) => item.estimatedPrice <= Number(filters.maxPrice),
    );
  }

  if (filters.minRating) {
    result = result.filter((item) => item.rating >= Number(filters.minRating));
  }

  switch (filters.sortBy) {
    case 'priceAsc':
      result.sort((a, b) => a.estimatedPrice - b.estimatedPrice);
      break;
    case 'priceDesc':
      result.sort((a, b) => b.estimatedPrice - a.estimatedPrice);
      break;
    case 'ratingDesc':
      result.sort((a, b) => b.rating - a.rating);
      break;
    case 'popular':
    default:
      result.sort((a, b) => b.popularScore - a.popularScore);
      break;
  }

  return result;
}