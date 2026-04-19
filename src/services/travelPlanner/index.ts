import request from '@/utils/axios';
import type { FilterPayload, TripForm } from './typing';

export async function getDestinations(params?: FilterPayload) {
  return request('/api/travel-planner/destinations', {
    method: 'GET',
    params,
  });
}

export async function getDestinationById(id: string) {
  return request(`/api/travel-planner/destinations/${id}`, {
    method: 'GET',
  });
}

export async function createTrip(data: TripForm) {
  return request('/api/travel-planner/trips', {
    method: 'POST',
    data,
  });
}

export async function getTrips() {
  return request('/api/travel-planner/trips', {
    method: 'GET',
  });
}

export async function saveTripPlan(data: any) {
  return request('/api/travel-planner/trips/save-plan', {
    method: 'POST',
    data,
  });
}

export async function getDashboardStats() {
  return request('/api/travel-planner/dashboard', {
    method: 'GET',
  });
}