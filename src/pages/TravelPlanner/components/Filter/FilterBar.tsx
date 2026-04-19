import React from 'react';
import { Card, Col, Input, Row, Select, Slider } from 'antd';
import type { FilterPayload } from '@/services/travelPlanner/typing';

interface Props {
  value: FilterPayload;
  onChange: (payload: Partial<FilterPayload>) => void;
}

const FilterBar: React.FC<Props> = ({ value, onChange }) => {
  return (
    <Card bordered={false} className="travel-card soft-card">
      <Row gutter={[16, 16]}>
        <Col xs={24} md={8}>
          <Input
            placeholder="Tìm theo tên hoặc địa điểm"
            value={value.keyword}
            onChange={(e) => onChange({ keyword: e.target.value })}
          />
        </Col>

        <Col xs={24} md={4}>
          <Select
            allowClear
            style={{ width: '100%' }}
            placeholder="Loại hình"
            value={value.category}
            onChange={(category) => onChange({ category })}
            options={[
              { label: 'Biển', value: 'beach' },
              { label: 'Núi', value: 'mountain' },
              { label: 'Thành phố', value: 'city' },
            ]}
          />
        </Col>

        <Col xs={24} md={4}>
          <Select
            style={{ width: '100%' }}
            placeholder="Sắp xếp"
            value={value.sortBy}
            onChange={(sortBy) => onChange({ sortBy })}
            options={[
              { label: 'Phổ biến', value: 'popular' },
              { label: 'Giá tăng dần', value: 'priceAsc' },
              { label: 'Giá giảm dần', value: 'priceDesc' },
              { label: 'Đánh giá cao', value: 'ratingDesc' },
            ]}
          />
        </Col>

        <Col xs={24} md={4}>
          <Select
            allowClear
            style={{ width: '100%' }}
            placeholder="Đánh giá"
            value={value.minRating}
            onChange={(minRating) => onChange({ minRating })}
            options={[
              { label: 'Từ 3 sao', value: 3 },
              { label: 'Từ 4 sao', value: 4 },
              { label: 'Từ 4.5 sao', value: 4.5 },
            ]}
          />
        </Col>

        <Col xs={24} md={4}>
          <div style={{ padding: '0 12px' }}>
            <div style={{ marginBottom: 8 }}>Giá tối đa</div>
            <Slider
              min={1000000}
              max={15000000}
              step={500000}
              value={value.maxPrice || 15000000}
              onChange={(maxPrice) => onChange({ maxPrice: Number(maxPrice) })}
            />
          </div>
        </Col>
      </Row>
    </Card>
  );
};

export default FilterBar;