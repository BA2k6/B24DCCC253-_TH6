// src/pages/TravelPlanner/Home.tsx
import { useEffect, useState } from 'react';
import { getDestinations, getItineraries, saveItineraries, createEmptyItinerary } from '@/services/TravelPlannerService';
import {
  Card, Col, Row, Select, Slider, Rate, Input,
  Button, Typography, notification,
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import type { Destination } from '@/services/TravelPlannerService';

const { Title, Text } = Typography;
const types: ('biển' | 'núi' | 'thành phố')[] = ['biển', 'núi', 'thành phố'];

export default function HomePage() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [filterType, setFilterType] = useState<string | undefined>(undefined);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 3500000]);
  const [ratingMin, setRatingMin] = useState<number>(0);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<'priceAsc' | 'priceDesc' | 'rating'>('rating');

  useEffect(() => {
    const dst = getDestinations();
    setDestinations(dst);
  }, []);

  const filtered = destinations
    .filter((d: any) => !filterType || d.type === filterType)
    .filter((d: any) => d.priceMin >= priceRange[0] && d.priceMax <= priceRange[1])
    .filter((d: any) => d.rating >= ratingMin)
    .filter((d: any) => d.name.toLowerCase().includes(search.toLowerCase()) || d.description.toLowerCase().includes(search.toLowerCase()))
    .sort((a: any, b: any) => {
      if (sortBy === 'priceAsc') return a.priceMin - b.priceMin;
      if (sortBy === 'priceDesc') return b.priceMin - a.priceMin;
      return b.rating - a.rating;
    });

  const addToItinerary = (destId: string) => {
    const itineraries = getItineraries();
    let itinerary = itineraries[0];
    if (!itinerary) {
      itinerary = createEmptyItinerary('Lịch trình tiêu chuẩn');
      itineraries.push(itinerary);
    }
    const day = itinerary.days[0];
    if (day.items.map((i) => i.destId).includes(destId)) {
      notification.warning({ message: 'Đã tồn tại', description: 'Đã có điểm này trong lịch trình ngày 1' });
      return;
    }
    day.items.push({ destId });
    saveItineraries(itineraries);
    notification.success({ message: 'Thêm thành công', description: 'Đã thêm vào lịch trình ngày 1' });
  };

  return (
    <div style={{ padding: 16 }}>
      <Title level={3}>Khám phá điểm đến</Title>

      <Card style={{ marginBottom: 16 }}>
        <Row gutter={[12, 12]}>
          <Col xs={24} sm={12} md={6}>
            <Text>Loại</Text>
            <Select allowClear style={{ width: '100%' }} placeholder='Chọn loại' value={filterType} onChange={setFilterType}>
              {types.map((t) => (<Select.Option key={t} value={t}>{t}</Select.Option>))}
            </Select>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Text>Giá (tối đa)</Text>
            <Slider range max={5000000} step={100000} value={priceRange} onChange={setPriceRange} />
            <Text>{priceRange[0]} - {priceRange[1]}</Text>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Text>Điểm đánh giá tối thiểu</Text>
            <Rate allowHalf value={ratingMin} onChange={(v) => setRatingMin(v)} />
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Text>Tìm kiếm</Text>
            <Input placeholder='Tên/miêu tả' value={search} onChange={(e) => setSearch(e.target.value)} />
          </Col>
        </Row>

        <Row style={{ marginTop: 12 }} gutter={[12, 12]}>
          <Col xs={24} sm={24} md={6}>
            <Select style={{ width: '100%' }} value={sortBy} onChange={(value) => setSortBy(value)}>
              <Select.Option value='rating'>Rating cao</Select.Option>
              <Select.Option value='priceAsc'>Giá tăng</Select.Option>
              <Select.Option value='priceDesc'>Giá giảm</Select.Option>
            </Select>
          </Col>
        </Row>
      </Card>

      <Row gutter={[12, 12]}>
        {filtered.map((dest: any) => (
          <Col key={dest.id} xs={24} sm={12} md={8} lg={6}>
            <Card
              cover={<img alt={dest.name} src={dest.image} style={{ height: 180, objectFit: 'cover' }} />}
              actions={[
                <Button key="add" type='primary' icon={<PlusOutlined />} onClick={() => addToItinerary(dest.id)}>Thêm lịch trình</Button>,
              ]}
            >
              <Card.Meta
                title={dest.name}
                description={
                  <div>
                    <div>{dest.type} · Giá: {dest.priceMin.toLocaleString()} - {dest.priceMax.toLocaleString()}</div>
                    <div><Rate disabled value={dest.rating} /> <Text>{dest.rating.toFixed(1)}</Text></div>
                    <Text type="secondary">{dest.description}</Text>
                  </div>
                }
              />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}