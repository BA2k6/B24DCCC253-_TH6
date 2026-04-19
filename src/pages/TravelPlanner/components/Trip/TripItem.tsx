import React from 'react';
import { Button, Card, Space, Tag, Typography } from 'antd';
import type { PlannedDestination } from '@/models/travelPlanner/types';

const { Text } = Typography;

interface Props {
  item: PlannedDestination;
  index: number;
  total: number;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onRemove: () => void;
}

const TripItem: React.FC<Props> = ({
  item,
  index,
  total,
  onMoveUp,
  onMoveDown,
  onRemove,
}) => {
  return (
    <Card size="small" className="trip-item-card">
      <Space direction="vertical" size={8} style={{ width: '100%' }}>
        <Space style={{ width: '100%', justifyContent: 'space-between' }}>
          <Text strong>
            {item.orderIndex}. {item.name}
          </Text>
          <Tag color="blue">{item.estimatedTravelTime} phút</Tag>
        </Space>

        <Text type="secondary">{item.location}</Text>
        <Text>Tham quan: {item.visitDurationHours} giờ</Text>

        <Space wrap>
          <Button size="small" disabled={index === 0} onClick={onMoveUp}>
            Lên
          </Button>
          <Button
            size="small"
            disabled={index === total - 1}
            onClick={onMoveDown}
          >
            Xuống
          </Button>
          <Button size="small" danger onClick={onRemove}>
            Xóa
          </Button>
        </Space>
      </Space>
    </Card>
  );
};

export default TripItem;