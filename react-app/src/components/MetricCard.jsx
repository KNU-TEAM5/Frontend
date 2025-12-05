import styled from 'styled-components';

const Card = styled.div`
  background: ${props => props.theme.colors.primaryGradient};
  color: white;
  padding: 30px;
  border-radius: ${props => props.theme.borderRadius.large};
  box-shadow: ${props => props.theme.shadows.medium};
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const MetricValue = styled.div`
  font-size: 3em;
  font-weight: bold;
  margin-bottom: 10px;
`;

const MetricLabel = styled.div`
  font-size: 1.1em;
  opacity: 0.9;
  margin-bottom: 8px;
`;

const MetricDescription = styled.div`
  font-size: 0.95em;
  opacity: 0.85;
  font-weight: 300;
  line-height: 1.4;
  margin-top: 10px;
  padding-top: 10px;
  border-top: 1px solid rgba(255, 255, 255, 0.3);
`;

export const MetricCard = ({ value, label, description }) => {
  return (
    <Card>
      <MetricValue>{value}</MetricValue>
      <MetricLabel>{label}</MetricLabel>
      <MetricDescription>{description}</MetricDescription>
    </Card>
  );
};
