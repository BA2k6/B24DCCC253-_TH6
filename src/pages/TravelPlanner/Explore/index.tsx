import { useEffect, useState, useMemo } from 'react';
import { request } from 'umi';
import { Spin, message } from 'antd';

import HeroBanner from '../components/Hero/HeroBanner';
import FilterBar from '../components/Filter/FilterBar';
import DestinationList from '../components/Destination/DestinationList';

import type {
  DestinationItem,
  FilterPayload,
} from '@/services/travelPlanner/typing';

const Explore = () => {
  const [filters, setFilters] = useState<FilterPayload>({
    keyword: '',
    sortBy: 'popular',
  });

  const [data, setData] = useState<DestinationItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    request('/api/travel-planner/destinations')
      .then((res) => setData(res || []))
      .finally(() => setLoading(false));
  }, []);

  const handleAdd = (item: DestinationItem) => {
    const existing = JSON.parse(localStorage.getItem('trip') || '[]');

    const newItem = {
      id: item.id,
      name: item.name,
      location: item.location,
      estimatedTravelTime: 30,
      visitDurationHours: item.visitDurationHours,
      orderIndex: existing.length + 1,
    };

    localStorage.setItem('trip', JSON.stringify([...existing, newItem]));
    message.success('Đã thêm vào lịch trình');
  };

  const filteredData = useMemo(() => {
    let result = [...data];

    if (filters.keyword) {
      const k = filters.keyword.toLowerCase();
      result = result.filter(
        (item) =>
          item.name.toLowerCase().includes(k) ||
          item.location.toLowerCase().includes(k)
      );
    }

    if (filters.category) {
      result = result.filter((item) => item.category === filters.category);
    }

    if (filters.minRating != null) {
      result = result.filter((item) => item.rating >= filters.minRating!);
    }

    if (filters.maxPrice != null) {
      result = result.filter(
        (item) => item.estimatedPrice <= filters.maxPrice!
      );
    }

    if (filters.sortBy === 'priceAsc') {
      result.sort((a, b) => a.estimatedPrice - b.estimatedPrice);
    } else if (filters.sortBy === 'priceDesc') {
      result.sort((a, b) => b.estimatedPrice - a.estimatedPrice);
    } else if (filters.sortBy === 'ratingDesc') {
      result.sort((a, b) => b.rating - a.rating);
    } else {
      result.sort((a, b) => b.popularScore - a.popularScore);
    }

    return result;
  }, [data, filters]);

  return (
    <>
      <HeroBanner
        keyword={filters.keyword}
        onSearch={(value) =>
          setFilters((prev) => ({ ...prev, keyword: value }))
        }
      />

      <div style={{ marginTop: 24 }}>
        <FilterBar
          value={filters}
          onChange={(payload) =>
            setFilters((prev) => ({ ...prev, ...payload }))
          }
        />
      </div>

      <div style={{ marginTop: 24 }}>
        {loading ? (
          <Spin size="large" style={{ width: '100%' }} />
        ) : (
          <DestinationList data={filteredData} onAdd={handleAdd} />
        )}
      </div>
    </>
  );
};

export default Explore;