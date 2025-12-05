import styled from 'styled-components';

const InsightContainer = styled.div`
  padding: 40px;
`;

const InsightBox = styled.div`
  background: white;
  padding: 30px;
  border-radius: ${props => props.theme.borderRadius.large};
  box-shadow: ${props => props.theme.shadows.small};
  margin-bottom: 30px;
  text-align: center;
`;

const Title = styled.h3`
  font-size: 1.5em;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 20px;
`;

const Message = styled.p`
  font-size: 1.1em;
  color: ${props => props.theme.colors.textMuted};
  line-height: 1.6;
`;

export const AIInsight = () => {
  return (
    <InsightContainer>
      <InsightBox>
        <Title>🤖 AI 해설 대기 중</Title>
        <Message>
          분석 결과에 대한 AI 해설 기능은 준비 중입니다.
        </Message>
      </InsightBox>
    </InsightContainer>
  );
};
