import styled from 'styled-components';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

// Chart.js 등록
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const SectionTitle = styled.h2`
  font-size: 1.8em;
  color: ${props => props.theme.colors.text};
  margin-bottom: 25px;
  padding-bottom: 10px;
  border-bottom: 3px solid ${props => props.theme.colors.primary};
`;

const ChartContainer = styled.div`
  background: white;
  padding: 30px;
  border-radius: ${props => props.theme.borderRadius.large};
  box-shadow: ${props => props.theme.shadows.small};
  margin-bottom: 30px;
`;

const ChartWrapper = styled.div`
  position: relative;
  height: 400px;

  @media (max-width: 768px) {
    height: 300px;
  }
`;

const ChartCaption = styled.div`
  margin-top: 20px;
  padding: 15px;
  background: ${props => props.theme.colors.lightBackground};
  border-left: 4px solid ${props => props.theme.colors.primary};
  border-radius: ${props => props.theme.borderRadius.small};
  color: ${props => props.theme.colors.textLight};
  font-size: 0.95em;
  line-height: 1.6;
`;

export const FeatureImportanceChart = ({ data }) => {
  if (!data || Object.keys(data).length === 0) {
    return null;
  }

  const features = Object.keys(data);
  const importance = Object.values(data);

  const chartData = {
    labels: features,
    datasets: [{
      label: '중요도',
      data: importance,
      backgroundColor: 'rgba(102, 126, 234, 0.6)',
      borderColor: 'rgba(102, 126, 234, 1)',
      borderWidth: 2
    }]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: 'y',
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: false
      }
    },
    scales: {
      x: {
        beginAtZero: true
      }
    }
  };

  return (
    <>
      <SectionTitle>🔍 어떤 요소가 불량을 판단하는데 가장 중요할까요?</SectionTitle>
      <ChartContainer>
        <ChartWrapper>
          <Bar data={chartData} options={options} />
        </ChartWrapper>
        <ChartCaption>
          <strong>📊 이 그래프는 무엇을 보여주나요?</strong><br />
          AI가 불량을 판단할 때 각 요소(온도, 압력, 습도)를 얼마나 중요하게 보는지 나타냅니다.
          막대가 길수록 그 요소가 불량 판정에 큰 영향을 미친다는 의미입니다.
        </ChartCaption>
      </ChartContainer>
    </>
  );
};
