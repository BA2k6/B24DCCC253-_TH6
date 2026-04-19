import React from 'react';
import { Space } from 'antd';
import BudgetSummary from '../components/Budget/BudgetSummary';
import BudgetCharts from '../components/Budget/BudgetChart';

const BudgetPage: React.FC = () => {
  const budget = {
    budgetLimit: 10000000,
    totalSpent: 6000000,
    remaining: 4000000,
    percentUsed: 60,
    categories: {
      meal: 2000000,
      hotel: 2000000,
      transport: 1000000,
      ticket: 1000000,
      other: 0,
    },
  };

  const weeklyData = [
    { day: 'Day 1', value: 1000000 },
    { day: 'Day 2', value: 2000000 },
  ];

  return (
    <div className="travel-page">
      <Space direction="vertical" size={24} style={{ width: '100%' }}>
        
        {/* SUMMARY */}
        <BudgetSummary budget={budget} />

        {/* CHARTS + PANEL */}
        <BudgetCharts
          budget={budget}
          weeklyData={weeklyData}
        />

      </Space>
    </div>
  );
};

export default BudgetPage;