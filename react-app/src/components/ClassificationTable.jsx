import styled from 'styled-components';

const SectionTitle = styled.h2`
  font-size: 1.8em;
  color: ${props => props.theme.colors.text};
  margin-bottom: 25px;
  padding-bottom: 10px;
  border-bottom: 3px solid ${props => props.theme.colors.primary};
`;

const TableContainer = styled.div`
  overflow-x: auto;
  background: white;
  padding: 20px;
  border-radius: ${props => props.theme.borderRadius.large};
  box-shadow: ${props => props.theme.shadows.small};
  margin-bottom: 30px;
`;

const TableCaption = styled.div`
  margin-top: 20px;
  padding: 15px;
  background: ${props => props.theme.colors.lightBackground};
  border-left: 4px solid ${props => props.theme.colors.primary};
  border-radius: ${props => props.theme.borderRadius.small};
  color: ${props => props.theme.colors.textLight};
  font-size: 0.95em;
  line-height: 1.6;
`;

export const ClassificationTable = ({ metrics }) => {
  if (!metrics) {
    return null;
  }

  return (
    <>
      <SectionTitle>📋 상세 성능 리포트</SectionTitle>
      <TableContainer>
        <table>
          <thead>
            <tr>
              <th>구분</th>
              <th>정밀도</th>
              <th>검출률</th>
              <th>종합점수</th>
              <th>제품 수</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>정상</td>
              <td>{metrics.class0.precision.toFixed(4)}</td>
              <td>{metrics.class0.recall.toFixed(4)}</td>
              <td>{metrics.class0.f1.toFixed(4)}</td>
              <td>{metrics.class0.support}</td>
            </tr>
            <tr>
              <td>불량</td>
              <td>{metrics.class1.precision.toFixed(4)}</td>
              <td>{metrics.class1.recall.toFixed(4)}</td>
              <td>{metrics.class1.f1.toFixed(4)}</td>
              <td>{metrics.class1.support}</td>
            </tr>
            <tr>
              <td><strong>정확도</strong></td>
              <td colSpan="4"><strong>{metrics.accuracy.toFixed(4)}</strong></td>
            </tr>
          </tbody>
        </table>
        <TableCaption>
          <strong>📊 표를 어떻게 읽나요?</strong><br />
          <strong>정상 제품:</strong> AI가 정상 제품을 얼마나 잘 판단했는지 보여줍니다.<br />
          <strong>불량 제품:</strong> AI가 불량 제품을 얼마나 잘 찾아냈는지 보여줍니다.<br />
          <strong>전체 정확도:</strong> 모든 제품을 종합했을 때의 정확도입니다.<br />
          숫자가 1에 가까울수록 더 좋은 성능입니다!
        </TableCaption>
      </TableContainer>
    </>
  );
};
