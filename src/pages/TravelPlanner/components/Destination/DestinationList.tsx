import React from 'react';
import { Col, Empty, Row } from 'antd';
import type { DestinationItem } from '@/services/travelPlanner/typing';
import DestinationCard from './DestinationCard';

interface Props {
  data: DestinationItem[];
  onAdd: (item: DestinationItem) => void;
}

const DestinationList: React.FC<Props> = ({ data, onAdd }) => {
  if (!data.length) {
    return <Empty description="Không tìm thấy điểm đến" />;
  }

  return (
    <Row gutter={[24, 24]}>
      {data.map((item) => (
        <Col xs={24} sm={12} md={8} key={item.id}>
          <DestinationCard item={item} onAdd={onAdd} />
        </Col>
      ))}
    </Row>
  );
};

export default DestinationList;