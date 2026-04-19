import React from 'react';
import { Card, Empty, Space, Typography } from 'antd';
import type { DayPlan } from '@/models/travelPlanner/types';
import TripItem from './TripItem';

const { Text, Title } = Typography;

interface Props {
  day: DayPlan;
  onMove: (fromIndex: number, toIndex: number) => void;
  onRemove: (destinationId: string) => void;
}

const DayColumn: React.FC<Props> = ({ day, onMove, onRemove }) => {
  return (
    <Card className="travel-card day-column-card">
      <Space direction="vertical" style={{ width: '100%' }}>
        <div>
          <Title level={5} style={{ marginBottom: 4 }}>
            Ngày {day.dayNumber}
          </Title>
          <Text type="secondary">{day.dateLabel}</Text>
        </div>

        {!day.items.length ? (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Chưa có điểm đến" />
        ) : (
          <Space direction="vertical" size={12} style={{ width: '100%' }}>
            {day.items.map((item, index) => (
              <TripItem
                key={item.id}
                item={item}
                index={index}
                total={day.items.length}
                onMoveUp={() => onMove(index, index - 1)}
                onMoveDown={() => onMove(index, index + 1)}
                onRemove={() => onRemove(item.id)}
              />
            ))}
          </Space>
        )}
      </Space>
    </Card>
  );
};

export default DayColumn;