import styled from 'styled-components';

const TabsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding: 30px 40px;
  background: ${props => props.theme.colors.lightBackground};
  border-bottom: 2px solid ${props => props.theme.colors.border};

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 20px;
  }
`;

const TabButton = styled.button`
  padding: 12px 40px;
  border: none;
  background: ${props => props.active ? props.theme.colors.primaryGradient : 'white'};
  color: ${props => props.active ? 'white' : props.theme.colors.textLight};
  font-size: 1.1em;
  font-weight: 600;
  border-radius: ${props => props.theme.borderRadius.medium};
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: ${props => props.theme.shadows.small};

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 10px;
  margin-left: auto;

  @media (max-width: 768px) {
    width: 100%;
    margin-left: 0;
    margin-top: 10px;
    flex-direction: column;
  }
`;

const ActionButton = styled.button`
  padding: 12px 30px;
  border: ${props => props.primary ? 'none' : `2px solid ${props.theme.colors.primary}`};
  background: ${props => props.primary ? props.theme.colors.primaryGradient : 'white'};
  color: ${props => props.primary ? 'white' : props.theme.colors.primary};
  font-size: 1.1em;
  font-weight: 600;
  border-radius: ${props => props.theme.borderRadius.medium};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.primary ? props.theme.colors.primaryGradientHover : props.theme.colors.primary};
    color: white;
    transform: translateY(-2px);
    box-shadow: ${props => props.primary
      ? '0 4px 12px rgba(102, 126, 234, 0.5)'
      : '0 4px 12px rgba(102, 126, 234, 0.3)'};
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const Tabs = ({ activeView, onViewChange, onDataAdd, onAnalyze, onDataCleanup }) => {
  return (
    <TabsContainer>
      <TabButton
        active={activeView === 'DataAnalysis'}
        onClick={() => onViewChange('DataAnalysis')}
      >
        📊 데이터 분석
      </TabButton>
      <TabButton
        active={activeView === 'AIInsight'}
        onClick={() => onViewChange('AIInsight')}
      >
        🤖 AI 해설
      </TabButton>

      <ActionButtons>
        <ActionButton onClick={onDataAdd}>
          📁 데이터 추가
        </ActionButton>
        <ActionButton onClick={onDataCleanup}>
          🗑️ 데이터 정리
        </ActionButton>
        <ActionButton primary onClick={onAnalyze}>
          ▶️ 분석 시작
        </ActionButton>
      </ActionButtons>
    </TabsContainer>
  );
};
