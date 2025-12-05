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
  position: relative;
`;

const ChartTitle = styled.h3`
  font-size: 1.5em;
  color: ${props => props.theme.colors.text};
  margin-bottom: 20px;
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

export const ConfusionMatrixChart = ({ data }) => {
  if (!data || Object.keys(data).length === 0) {
    return null;
  }

  const chartData = {
    labels: ['정상→정상 (TN)', '정상→불량 (FP)', '불량→정상 (FN)', '불량→불량 (TP)'],
    datasets: [{
      label: '샘플 수',
      data: [
        data['0']?.['0'] || 0,  // TN
        data['0']?.['1'] || 0,  // FP
        data['1']?.['0'] || 0,  // FN
        data['1']?.['1'] || 0   // TP
      ],
      backgroundColor: [
        'rgba(75, 192, 192, 0.6)',
        'rgba(255, 99, 132, 0.6)',
        'rgba(255, 159, 64, 0.6)',
        'rgba(54, 162, 235, 0.6)'
      ],
      borderColor: [
        'rgba(75, 192, 192, 1)',
        'rgba(255, 99, 132, 1)',
        'rgba(255, 159, 64, 1)',
        'rgba(54, 162, 235, 1)'
      ],
      borderWidth: 2
    }]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: false
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          precision: 0
        }
      }
    }
  };

  return (
    <>
      <SectionTitle>🎯 AI가 얼마나 정확하게 판단했을까요?</SectionTitle>
      <ChartContainer>
        <ChartTitle>혼동 행렬 (Confusion Matrix)</ChartTitle>
        <ChartWrapper>
          <Bar data={chartData} options={options} />
        </ChartWrapper>
        <ChartCaption>
          <strong>📊 이 그래프는 무엇을 보여주나요?</strong><br />
          AI의 판단 결과를 4가지로 나눠 보여줍니다. 초록색 막대는 정확한 판단, 빨간색 막대는 잘못된 판단입니다.
          빨간색 막대가 작을수록 AI가 실수를 적게 했다는 뜻이에요.<br />
          <em>※ 'A→B'는 실제로는 A였으나 AI가 B라고 판단했다는 것을 뜻합니다.</em>
        </ChartCaption>
      </ChartContainer>
    </>
  );
};
