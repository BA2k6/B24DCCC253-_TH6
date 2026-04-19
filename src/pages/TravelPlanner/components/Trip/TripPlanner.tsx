import React from 'react';
import { Card, Col, Row, Segmented, Space, Typography } from 'antd';
import type { DayPlan } from '@/models/travelPlanner/types';
import DayColumn from './DayColumn';

const { Title, Text } = Typography;

interface Props {
  dayPlans: DayPlan[];
  selectedDay: number;
  onSelectDay: (day: number) => void;
  onMoveItem: (dayNumber: number, fromIndex: number, toIndex: number) => void;
  onRemoveItem: (dayNumber: number, destinationId: string) => void;
}

const TripPlanner: React.FC<Props> = ({
  dayPlans,
  selectedDay,
  onSelectDay,
  onMoveItem,
  onRemoveItem,
}) => {
  const activeDay = dayPlans.find((day) => day.dayNumber === selectedDay) || dayPlans[0];

  return (
    <Card className="travel-card soft-card">
      <Space direction="vertical" size={16} style={{ width: '100%' }}>
        <div>
          <Title level={4} style={{ marginBottom: 4 }}>
            Lịch trình chuyến đi
          </Title>
          <Text type="secondary">
            Chọn ngày để thêm điểm đến và sắp xếp hành trình.
          </Text>
        </div>

        <Segmented
          block
          value={selectedDay}
          onChange={(value) => onSelectDay(Number(value))}
          options={dayPlans.map((day) => ({
            label: `Ngày ${day.dayNumber}`,
            value: day.dayNumber,
          }))}
        />

        <Row gutter={[16, 16]}>
          <Col span={24}>
            {activeDay && (
              <DayColumn
                day={activeDay}
                onMove={(fromIndex, toIndex) =>
                  onMoveItem(activeDay.dayNumber, fromIndex, toIndex)
                }
                onRemove={(destinationId) =>
                  onRemoveItem(activeDay.dayNumber, destinationId)
                }
              />
            )}
          </Col>
        </Row>
      </Space>
    </Card>
  );
};

export default TripPlanner;