// src/pages/TravelPlanner/Itinerary.tsx
import { useEffect, useMemo, useState } from 'react';
import { getDestinations, getItineraries, saveItineraries, createEmptyItinerary, type Destination, type Itinerary } from '@/services/TravelPlannerService';
import {
  Card, Tabs, Button, Select, List, Row, Col, Typography, Space
} from 'antd';
import { PlusOutlined, DeleteOutlined, ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const travelTimeByType = (type: 'biển' | 'núi' | 'thành phố') => (type === 'biển' ? 45 : type === 'núi' ? 60 : 30);

export default function ItineraryPage() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [itineraries, setItineraries] = useState<Itinerary[]>([]);
  const [activeItineraryId, setActiveItineraryId] = useState<string>('');
  const [activeDay, setActiveDay] = useState<number>(1);
  const [selectedDest, setSelectedDest] = useState<string>('');

  useEffect(() => {
    setDestinations(getDestinations());
    const its = getItineraries();
    if (its.length === 0) {
      const newIt = createEmptyItinerary('Lịch trình mặc định');
      saveItineraries([newIt]);
      setItineraries([newIt]);
      setActiveItineraryId(newIt.id);
    } else {
      setItineraries(its);
      setActiveItineraryId(its[0].id);
    }
  }, []);

  const activeItinerary = useMemo(() => itineraries.find((it) => it.id === activeItineraryId), [itineraries, activeItineraryId])!;
  const activeDayData = useMemo(() => activeItinerary?.days.find((d) => d.day === activeDay), [activeItinerary, activeDay]);

  const persist = (next: Itinerary[]) => {
    setItineraries(next);
    saveItineraries(next);
  };

  const addDay = () => {
    if (!activeItinerary) return;
    const next = [...itineraries];
    const p = next.find((t) => t.id === activeItineraryId);
    if (!p) return;
    const maxDay = Math.max(...p.days.map((d) => d.day));
    p.days.push({ day: maxDay + 1, items: [] });
    persist(next);
    setActiveDay(maxDay + 1);
  };

  const removeDay = (day: number) => {
    if (!activeItinerary) return;
    const next = [...itineraries];
    const p = next.find((t) => t.id === activeItineraryId);
    if (!p) return;
    if (p.days.length === 1) return;
    p.days = p.days.filter((d) => d.day !== day).map((d, idx) => ({ ...d, day: idx + 1 }));
    persist(next);
    setActiveDay(1);
  };

  const addDestinationToDay = () => {
    if (!selectedDest || !activeItinerary) return;
    const next = [...itineraries];
    const p = next.find((t) => t.id === activeItineraryId);
    if (!p) return;
    const dayItem = p.days.find((d) => d.day === activeDay);
    if (!dayItem || dayItem.items.some((i) => i.destId === selectedDest)) return;
    dayItem.items.push({ destId: selectedDest });
    persist(next);
    setSelectedDest('');
  };

  const removeDestination = (destId: string) => {
    if (!activeItinerary) return;
    const next = [...itineraries];
    const p = next.find((t) => t.id === activeItineraryId);
    if (!p) return;
    const dayItem = p.days.find((d) => d.day === activeDay);
    if (!dayItem) return;
    dayItem.items = dayItem.items.filter((i) => i.destId !== destId);
    persist(next);
  };

  const moveItem = (from: number, to: number) => {
    if (!activeItinerary) return;
    const next = [...itineraries];
    const p = next.find((t) => t.id === activeItineraryId);
    if (!p) return;
    const dayItem = p.days.find((d) => d.day === activeDay);
    if (!dayItem || from < 0 || to < 0 || to >= dayItem.items.length) return;
    const tmp = dayItem.items[from];
    dayItem.items[from] = dayItem.items[to];
    dayItem.items[to] = tmp;
    persist(next);
  };

  const stats = () => {
    if (!activeDayData) return { totalCost: 0, totalDuration: 0, travelTime: 0 };
    let totalCost = 0;
    let totalDuration = 0;
    let travelTime = 0;
    activeDayData.items.forEach((item, idx) => {
      const d = destinations.find((x) => x.id === item.destId);
      if (!d) return;
      totalCost += d.costFood + d.costStay + d.costTransport;
      totalDuration += d.durationHrs;
      travelTime += travelTimeByType(d.type) + (idx > 0 ? 20 : 0);
    });
    return { totalCost, totalDuration, travelTime };
  };

  const { totalCost, totalDuration, travelTime } = stats();

  return (
    <div style={{ padding: 16 }}>
      <Title level={3}>Lịch trình du lịch</Title>
      <Space style={{ marginBottom: 12 }}>
        <Select value={activeItineraryId} style={{ width: 250 }} onChange={(value) => setActiveItineraryId(value)}>
          {itineraries.map((it) => (<Select.Option key={it.id} value={it.id}>{it.name}</Select.Option>))}
        </Select>
        <Button icon={<PlusOutlined />} onClick={() => {
          const newIt = createEmptyItinerary(`Lịch trình ${itineraries.length + 1}`);
          const next = [...itineraries, newIt];
          persist(next);
          setActiveItineraryId(newIt.id);
        }}>Thêm lịch trình</Button>
      </Space>

      <Card style={{ marginBottom: 16 }}>
        <Space>
          <Button type='dashed' onClick={addDay}><PlusOutlined /> Thêm ngày</Button>
        </Space>
      </Card>

      <Tabs activeKey={String(activeDay)} onChange={(key) => setActiveDay(Number(key))} onEdit={(key, action) => {
        if (action === 'remove') removeDay(Number(key));
      }}>
        {activeItinerary?.days.map((day) => (
          <Tabs.TabPane
            key={day.day.toString()}
            tab={`Ngày ${day.day}`}
            closable={activeItinerary.days.length > 1}
          >
            <Row gutter={12} style={{ marginBottom: 12 }}>
              <Col xs={24} md={16}>
                <Select
                  placeholder='Chọn điểm'
                  style={{ width: '100%' }}
                  value={selectedDest}
                  onChange={(value) => setSelectedDest(value)}
                  options={destinations.map((d) => ({ label: d.name, value: d.id }))}
                />
              </Col>
              <Col xs={24} md={8}>
                <Button type='primary' onClick={addDestinationToDay} block>Thêm vào Ngày {day.day}</Button>
              </Col>
            </Row>

            <List
              dataSource={day.items}
              locale={{ emptyText: 'Chưa có điểm nào' }}
              renderItem={(item, idx) => {
                const d = destinations.find((x) => x.id === item.destId);
                if (!d) return null;
                return (
                  <List.Item
                    actions={[
                      <Button key="up" icon={<ArrowUpOutlined />} disabled={idx === 0} onClick={() => moveItem(idx, idx - 1)} />,
                      <Button key="down" icon={<ArrowDownOutlined />} disabled={idx === day.items.length - 1} onClick={() => moveItem(idx, idx + 1)} />,
                      <Button key="delete" danger icon={<DeleteOutlined />} onClick={() => removeDestination(item.destId)} />,
                    ]}
                  >
                    <List.Item.Meta
                      avatar={<img src={d.image} alt={d.name} style={{ width: 100, borderRadius: 4, objectFit: 'cover' }} />}
                      title={d.name}
                      description={<div>
                        <Text>{d.type}</Text><br />
                        <Text>Chi phí: {(d.costFood + d.costStay + d.costTransport).toLocaleString()} đ</Text><br />
                        <Text>Thời gian tham quan: {d.durationHrs} giờ</Text>
                      </div>}
                    />
                  </List.Item>
                );
              }}
            />
          </Tabs.TabPane>
        ))}
      </Tabs>

      <Card title='Tổng quan ngày hiện tại' style={{ marginTop: 16 }}>
        <Row gutter={16}>
          <Col span={8}><Text strong>Tổng chi phí:</Text> {totalCost.toLocaleString()} đ</Col>
          <Col span={8}><Text strong>Tổng thời lượng:</Text> {totalDuration} giờ</Col>
          <Col span={8}><Text strong>Thời gian di chuyển ước tính:</Text> {travelTime} phút</Col>
        </Row>
      </Card>
    </div>
  );
}