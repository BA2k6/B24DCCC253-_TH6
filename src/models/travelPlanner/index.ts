import * as service from '../../services/travelPlanner/index';
import { applyDestinationFilters } from './destination';
import {
  createInitialDayPlans,
  addDestinationToDay,
  removeDestinationFromDay,
  moveDestination,
} from './trip';
import { calculateBudget } from './budget';

const TravelPlannerModel = {
  namespace: 'travelPlanner',

  state: {
    destinations: [],
    filteredDestinations: [],
    filters: {
      keyword: '',
      sortBy: 'popular',
    },
    tripForm: {
      title: 'Kế hoạch du lịch',
      startDate: '2025-06-01',
      endDate: '2025-06-03',
      budgetLimit: 10000000,
    },
    dayPlans: [],
    selectedDay: 1,
    budget: {},
    dashboard: {},
  },

  effects: {
    *fetchDestinations(
      { payload }: any,
      { call, put, select }: any,
    ): any {
      const res: any = yield call(service.getDestinations, payload);
      const data = res?.data || [];

      yield put({
        type: 'setDestinations',
        payload: data,
      });

      const filters = yield select(
        (state: any) => state.travelPlanner.filters,
      );

      yield put({
        type: 'setFilters',
        payload: filters,
      });
    },

    *fetchDashboardStats(
      _: any,
      { call, put }: any,
    ): any {
      const res: any = yield call(service.getDashboardStats);

      yield put({
        type: 'setDashboard',
        payload: res?.data || {},
      });
    },
  },

  reducers: {
    setDestinations(state: any, { payload }: any) {
      return {
        ...state,
        destinations: payload,
        filteredDestinations: applyDestinationFilters(
          payload,
          state.filters,
        ),
      };
    },

    setFilters(state: any, { payload }: any) {
      const filters = { ...state.filters, ...payload };

      return {
        ...state,
        filters,
        filteredDestinations: applyDestinationFilters(
          state.destinations,
          filters,
        ),
      };
    },

    initTripDays(state: any, { payload }: any) {
      const tripForm = { ...state.tripForm, ...payload };

      const dayPlans = createInitialDayPlans(
        tripForm.startDate,
        tripForm.endDate,
      );

      const budget = calculateBudget(
        dayPlans,
        tripForm.budgetLimit,
      );

      return {
        ...state,
        tripForm,
        dayPlans,
        selectedDay: 1,
        budget,
      };
    },

    setTripForm(state: any, { payload }: any) {
      const tripForm = { ...state.tripForm, ...payload };

      return {
        ...state,
        tripForm,
        budget: calculateBudget(
          state.dayPlans,
          tripForm.budgetLimit,
        ),
      };
    },

    setSelectedDay(state: any, { payload }: any) {
      return {
        ...state,
        selectedDay: payload,
      };
    },

    addDestination(state: any, { payload }: any) {
      const dayPlans = addDestinationToDay(
        state.dayPlans,
        payload.dayNumber,
        payload.destination,
      );

      return {
        ...state,
        dayPlans,
        budget: calculateBudget(
          dayPlans,
          state.tripForm.budgetLimit,
        ),
      };
    },

    removeDestination(state: any, { payload }: any) {
      const dayPlans = removeDestinationFromDay(
        state.dayPlans,
        payload.dayNumber,
        payload.destinationId,
      );

      return {
        ...state,
        dayPlans,
        budget: calculateBudget(
          dayPlans,
          state.tripForm.budgetLimit,
        ),
      };
    },

    reorderDestination(state: any, { payload }: any) {
      const dayPlans = moveDestination(
        state.dayPlans,
        payload.dayNumber,
        payload.fromIndex,
        payload.toIndex,
      );

      return {
        ...state,
        dayPlans,
        budget: calculateBudget(
          dayPlans,
          state.tripForm.budgetLimit,
        ),
      };
    },

    setDashboard(state: any, { payload }: any) {
      return {
        ...state,
        dashboard: payload,
      };
    },
  },
};

export default TravelPlannerModel;