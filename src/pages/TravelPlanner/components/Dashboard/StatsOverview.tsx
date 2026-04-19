import React from 'react';
import { Area, Bar, DualAxes } from '@ant-design/plots';
import { Card, Col, Row, Statistic } from 'antd';

interface Props {
  dashboard: any;
}

const StatsOverview: React.FC<Props> = ({ dashboard }) => {
  const monthlyTrips = dashboard.monthlyTrips || [];
  const popularity = dashboard.destinationPopularity || [];

  const dualAxesData = [
    monthlyTrips,
    monthlyTrips.map((item: any) => ({
      month: item.month,
      value: item.value * 2500000,
    })),
  ];

  return (
    <Row gutter={[16, 16]}>
      {/* STAT */}
      <Col xs={24} md={6}>
        <Card className="travel-card stat-card stat-card--orange">
          <Statistic title="Tổng lịch trình" value={dashboard.totalTrips || 0} />
        </Card>
      </Col>

      <Col xs={24} md={6}>
        <Card className="travel-card stat-card stat-card--green">
          <Statistic
            title="Doanh thu giả định"
            value={dashboard.totalRevenue || 0}
            formatter={(v) => `${Number(v).toLocaleString('vi-VN')} đ`}
          />
        </Card>
      </Col>

      <Col xs={24} md={6}>
        <Card className="travel-card stat-card stat-card--blue">
          <Statistic
            title="Điểm đến nổi bật"
            value={dashboard.topDestination || '-'}
          />
        </Card>
      </Col>

      <Col xs={24} md={6}>
        <Card className="travel-card stat-card stat-card--pink">
          <Statistic
            title="Ngân sách TB"
            value={dashboard.avgBudget || 0}
            formatter={(v) => `${Number(v).toLocaleString('vi-VN')} đ`}
          />
        </Card>
      </Col>

      {/* AREA */}
      <Col xs={24} lg={12}>
        <Card className="travel-card soft-card" title="Số lịch trình theo tháng">
          <Area
            data={monthlyTrips}
            xField="month"
            yField="value"
          />
        </Card>
      </Col>

      {/* DUAL AXES */}
      <Col xs={24} lg={12}>
        <Card
          className="travel-card soft-card"
          title="Lịch trình & doanh thu"
        >
          <DualAxes
            data={dualAxesData}
            xField="month"
            yField={['value', 'value']}
            geometryOptions={[
              {
                geometry: 'column',
              },
              {
                geometry: 'line',
                lineStyle: {
                  lineWidth: 2,
                },
              },
            ]}
          />
        </Card>
      </Col>

      {/* BAR */}
      <Col xs={24}>
        <Card className="travel-card soft-card" title="Độ phổ biến điểm đến">
          <Bar
            data={popularity}
            xField="count"
            yField="name"
          />
        </Card>
      </Col>
    </Row>
  );
};

export default StatsOverview;