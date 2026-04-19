import { Layout } from 'antd';
import './index.less';

const { Content } = Layout;

const TravelPlannerLayout = (props: any) => {
  return (
    <Layout className="travel-layout">
      <Content className="travel-content">
        <div className="travel-page">
          {props.children}
        </div>
      </Content>
    </Layout>
  );
};

export default TravelPlannerLayout;