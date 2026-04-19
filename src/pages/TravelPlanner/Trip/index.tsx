import { useState } from 'react';
import {
  Card,
  Col,
  Row,
  Typography,
  Tag,
  Space,
  Button,
  Divider,
} from 'antd';
import {
  EnvironmentOutlined,
  ClockCircleOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  DeleteOutlined,
  CalendarOutlined,
} from '@ant-design/icons';

import type { DayPlan } from '@/models/travelPlanner/types';

const { Title, Text } = Typography;

const Trip = () => {
  const [dayPlans, setDayPlans] = useState<DayPlan[]>([
    {
      dayNumber: 1,
      dateLabel: '01/06/2025',
      items: [
  {
    id: '1',
    name: 'Sa Pa',
    location: 'Lào Cai',
    category: 'mountain',
    imageUrl: 'https://picsum.photos/400/200',
    description: 'Núi đẹp, khí hậu mát mẻ',
    rating: 4.5,
    estimatedPrice: 2500000,

    priceLevel: 3,
    visitDurationHours: 5,
    mealCost: 500000,
    hotelCost: 1000000,
    transportCost: 300000,
    ticketCost: 200000,
    popularScore: 90,

    estimatedTravelTime: 30,
    orderIndex: 1,
  },
],
    },
  ]);

  const handleMove = (dayNumber: number, from: number, to: number) => {
    setDayPlans((prev) =>
      prev.map((day) => {
        if (day.dayNumber !== dayNumber) return day;

        const items = [...day.items];
        if (to < 0 || to >= items.length) return day;

        const [moved] = items.splice(from, 1);
        items.splice(to, 0, moved);

        return { ...day, items };
      })
    );
  };

  const handleRemove = (dayNumber: number, id: string) => {
    setDayPlans((prev) =>
      prev.map((day) => {
        if (day.dayNumber !== dayNumber) return day;
        return {
          ...day,
          items: day.items.filter((i) => i.id !== id),
        };
      })
    );
  };

  return (
    <div className="travel-page">
      <Title level={2}>Lịch trình chuyến đi</Title>
      <Text type="secondary">
        Sắp xếp điểm đến theo từng ngày
      </Text>

      <div style={{ marginTop: 24 }}>
        {dayPlans.map((day) => (
          <Card
            key={day.dayNumber}
            className="travel-card soft-card"
            style={{ marginBottom: 24 }}
          >
            {/* HEADER */}
            <Space align="center">
              <CalendarOutlined style={{ color: '#ff7a45' }} />
              <Title level={4} style={{ margin: 0 }}>
                Ngày {day.dayNumber}
              </Title>
              <Text type="secondary">{day.dateLabel}</Text>
            </Space>

            <Divider />

            {/* LIST */}
            <Row gutter={[16, 16]}>
              {day.items.map((item, index) => (
                <Col span={24} key={item.id}>
                  <Card
                    style={{
                      borderRadius: 16,
                      background: '#fff7e6',
                      border: '1px solid #ffe7ba',
                    }}
                    bodyStyle={{ padding: 16 }}
                  >
                    <Row justify="space-between" align="middle">
                      {/* LEFT */}
                      <Col>
                        <Space direction="vertical">
                          <Text strong style={{ fontSize: 16 }}>
                            {index + 1}. {item.name}
                          </Text>

                          <Space>
                            <EnvironmentOutlined style={{ color: '#1677ff' }} />
                            <Text>{item.location}</Text>
                          </Space>

                          <Space>
                            <Tag color="blue" icon={<ClockCircleOutlined />}>
                              {item.estimatedTravelTime} phút
                            </Tag>

                            <Tag color="green">
                              {item.visitDurationHours} giờ tham quan
                            </Tag>
                          </Space>
                        </Space>
                      </Col>

                      {/* RIGHT */}
                      <Col>
                        <Space>
                          <Button
                            type="text"
                            icon={<ArrowUpOutlined />}
                            disabled={index === 0}
                            onClick={() =>
                              handleMove(day.dayNumber, index, index - 1)
                            }
                          />

                          <Button
                            type="text"
                            icon={<ArrowDownOutlined />}
                            disabled={index === day.items.length - 1}
                            onClick={() =>
                              handleMove(day.dayNumber, index, index + 1)
                            }
                          />

                          <Button
                            danger
                            icon={<DeleteOutlined />}
                            onClick={() =>
                              handleRemove(day.dayNumber, item.id)
                            }
                          />
                        </Space>
                      </Col>
                    </Row>
                  </Card>
                </Col>
              ))}
            </Row>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Trip;