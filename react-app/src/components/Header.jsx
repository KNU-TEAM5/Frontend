import styled from 'styled-components';

const HeaderContainer = styled.header`
  background: ${props => props.theme.colors.primaryGradient};
  color: white;
  padding: 40px;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 2.5em;
  margin-bottom: 10px;

  @media (max-width: 768px) {
    font-size: 1.8em;
  }
`;

const Subtitle = styled.h2`
  font-size: 1.5em;
  margin-bottom: 10px;
  font-weight: 500;
`;

export const Header = () => {
  return (
    <HeaderContainer>
      <Title>전해탈지 공정 데이터 분석</Title>
      <Subtitle>머신러닝 기반 품질 예측 시스템</Subtitle>
    </HeaderContainer>
  );
};
