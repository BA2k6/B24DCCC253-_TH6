import React from 'react';
import { Button, Input, Typography } from 'antd';

const { Title, Paragraph } = Typography;

interface Props {
  keyword?: string;
  onSearch: (value: string) => void;
}

const HeroBanner: React.FC<Props> = ({ keyword, onSearch }) => {
  return (
    <div className="travel-hero">
      <div className="travel-hero__content">
        <Title level={1}>Lên kế hoạch du lịch thông minh</Title>
        <Paragraph>
          Khám phá điểm đến, sắp xếp lịch trình theo ngày và theo dõi ngân sách
          bằng dashboard hiện đại.
        </Paragraph>

        {/* FIX Ở ĐÂY */}
        <Input.Group compact style={{ width: '100%', maxWidth: 560 }}>
          <Input
            style={{ width: '70%' }}
            value={keyword}
            placeholder="Bạn muốn đi đâu? Ví dụ: Đà Nẵng, Phú Quốc, Sa Pa"
            onChange={(e) => onSearch(e.target.value)}
          />
          <Button type="primary" style={{ width: '30%' }}>
            Khám phá
          </Button>
        </Input.Group>
      </div>
    </div>
  );
};

export default HeroBanner;