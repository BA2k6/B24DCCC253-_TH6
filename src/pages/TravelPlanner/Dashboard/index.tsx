import { Row, Col } from 'antd';
import StatsOverview from '../components/Dashboard/StatsOverview';
import PopularDestinationTable from '../components/Dashboard/PopularDestinationTable';

const DashboardPage = () => {
  const dashboard = {
    totalTrips: 12,
    totalRevenue: 25000000,
    avgBudget: 5000000,
    topDestination: 'Đà Nẵng',

    monthlyTrips: [
      { month: 'T1', value: 2 },
      { month: 'T2', value: 4 },
      { month: 'T3', value: 6 },
    ],

    destinationPopularity: [
      { name: 'Đà Nẵng', count: 10 },
      { name: 'Phú Quốc', count: 8 },
      { name: 'Sa Pa', count: 5 },
    ],
  };

  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <StatsOverview dashboard={dashboard} />
      </Col>

      <Col span={24}>
        <PopularDestinationTable
          data={dashboard.destinationPopularity}
        />
      </Col>
    </Row>
  );
};

export default DashboardPage;