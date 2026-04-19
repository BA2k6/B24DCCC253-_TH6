import React from 'react';
import { Button, Card, Rate, Space, Tag, Typography } from 'antd';
import type { DestinationItem } from '@/services/travelPlanner/typing';

const { Paragraph, Text, Title } = Typography;

interface Props {
  item: DestinationItem;
  onAdd: (item: DestinationItem) => void;
}

const categoryLabelMap = {
  beach: 'Biển',
  mountain: 'Núi',
  city: 'Thành phố',
};

const DestinationCard: React.FC<Props> = ({ item, onAdd }) => {
  return (
    <Card
      className="travel-card destination-card"
      hoverable
      cover={
        <img
          src={item.imageUrl}
          alt={item.name}
          className="destination-card__image"
        />
      }
    >
      <Space direction="vertical" size={8} style={{ width: '100%' }}>
        <Space style={{ justifyContent: 'space-between', width: '100%' }}>
          <Tag color="orange">
            {categoryLabelMap[item.category as keyof typeof categoryLabelMap]}
          </Tag>
          <Text strong>{item.estimatedPrice.toLocaleString('vi-VN')} đ</Text>
        </Space>

        <Title level={5} style={{ margin: 0 }}>
          {item.name}
        </Title>

        <Text type="secondary">{item.location}</Text>

        <Rate allowHalf disabled defaultValue={item.rating} style={{ fontSize: 14 }} />

        <Paragraph ellipsis={{ rows: 2 }} style={{ marginBottom: 0 }}>
          {item.description}
        </Paragraph>

        <Button type="primary" block onClick={() => onAdd(item)}>
          Thêm vào lịch trình
        </Button>
      </Space>
    </Card>
  );
};

export default DestinationCard;