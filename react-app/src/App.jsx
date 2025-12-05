import { useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import { GlobalStyles, theme } from "./styles/GlobalStyles";
import { Header } from "./components/Header";
import { Tabs } from "./components/Tabs";
import { MetricCard } from "./components/MetricCard";
import { ConfusionMatrixChart } from "./components/ConfusionMatrixChart";
import { FeatureImportanceChart } from "./components/FeatureImportanceChart";
import { ClassificationTable } from "./components/ClassificationTable";
import { DataCleanupModal } from "./components/DataCleanupModal";
import { AIInsight } from "./components/AIInsight";
import { useAnalysis } from "./hooks/useAnalysis";
import { useFileUpload } from "./hooks/useFileUpload";

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  background: white;
  border-radius: ${(props) => props.theme.borderRadius.xlarge};
  box-shadow: ${(props) => props.theme.shadows.large};
  overflow: hidden;
`;

const Content = styled.div`
  padding: 40px;

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const SectionTitle = styled.h2`
  font-size: 1.8em;
  color: ${(props) => props.theme.colors.text};
  margin-bottom: 25px;
  padding-bottom: 10px;
  border-bottom: 3px solid ${(props) => props.theme.colors.primary};
`;

const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 40px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Section = styled.div`
  margin-bottom: 50px;
`;

const LoadingOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: ${(props) => (props.show ? "flex" : "none")};
  align-items: center;
  justify-content: center;
  z-index: 999;
`;

const LoadingMessage = styled.div`
  background: white;
  padding: 40px 60px;
  border-radius: ${(props) => props.theme.borderRadius.large};
  text-align: center;
  box-shadow: ${(props) => props.theme.shadows.large};

  h3 {
    font-size: 1.5em;
    color: ${(props) => props.theme.colors.text};
    margin-bottom: 15px;
  }

  p {
    font-size: 1.1em;
    color: ${(props) => props.theme.colors.textMuted};
    line-height: 1.6;
  }
`;

const HiddenFileInput = styled.input`
  display: none;
`;

const SafeRegionBox = styled.div`
  background: white;
  padding: 30px;
  border-radius: ${(props) => props.theme.borderRadius.large};
  box-shadow: ${(props) => props.theme.shadows.small};
  margin-bottom: 30px;

  h3 {
    font-size: 1.5em;
    color: ${(props) => props.theme.colors.text};
    margin-bottom: 20px;
  }

  div {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 15px;
  }
`;

const SafeRegionItem = styled.div`
  padding: 15px;
  background: ${(props) => props.theme.colors.lightBackground};
  border-left: 4px solid ${(props) => props.theme.colors.primary};
  border-radius: ${(props) => props.theme.borderRadius.small};

  strong {
    color: ${(props) => props.theme.colors.primary};
    display: block;
    margin-bottom: 5px;
  }
`;

function App() {
  const [activeView, setActiveView] = useState("DataAnalysis");
  const [modalOpen, setModalOpen] = useState(false);

  const { data, loading, startAnalysis } = useAnalysis();

  const { fileInputRef, handleFileSelect, handleFileChange } = useFileUpload(
    (doAnalyze) => {
      if (doAnalyze) {
        startAnalysis();
      } else {
        alert("분석 시작 버튼을 눌러 언제든 분석을 실행할 수 있습니다.");
      }
    }
  );

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Container>
        <Header />

        <Tabs
          activeView={activeView}
          onViewChange={setActiveView}
          onDataAdd={handleFileSelect}
          onAnalyze={startAnalysis}
          onDataCleanup={() => setModalOpen(true)}
        />

        <HiddenFileInput
          ref={fileInputRef}
          type="file"
          multiple
          accept=".csv"
          onChange={handleFileChange}
        />

        {activeView === "DataAnalysis" && (
          <Content>
            {data && (
              <>
                <Section>
                  <SectionTitle>📊 주요 성능 지표</SectionTitle>
                  <MetricsGrid>
                    <MetricCard
                      value={data.metrics.accuracy.toFixed(4)}
                      label="정확도 (Accuracy)"
                      description="전체 예측 중 정확하게 맞춘 비율"
                    />
                    <MetricCard
                      value={data.metrics.class1.precision.toFixed(4)}
                      label="정밀도 (Precision)"
                      description="불량으로 예측한 것 중 실제 불량의 비율"
                    />
                    <MetricCard
                      value={data.metrics.class1.recall.toFixed(4)}
                      label="재현율 (Recall)"
                      description="실제 불량 중 정확히 찾아낸 비율"
                    />
                    <MetricCard
                      value={data.metrics.class1.f1.toFixed(4)}
                      label="F1-Score"
                      description="정밀도와 재현율의 조화 평균"
                    />
                  </MetricsGrid>
                </Section>

                <ConfusionMatrixChart data={data.confusionMatrix} />

                <FeatureImportanceChart data={data.featureImportance} />

                <ClassificationTable metrics={data.metrics} />

                {/* <Section>
                  <SafeRegionBox>
                    <h3>✅ 안전 운영 영역</h3>
                    <div>
                      {Object.entries(data.safeRegion).map(([key, value]) => (
                        <SafeRegionItem key={key}>
                          <strong>{key}</strong>
                          <span>
                            {value.min?.toFixed(2)} ~ {value.max?.toFixed(2)}
                          </span>
                        </SafeRegionItem>
                      ))}
                    </div>
                  </SafeRegionBox>
                </Section> */}
              </>
            )}

            {!data && (
              <Section style={{ textAlign: "center", padding: "60px 20px" }}>
                <h3
                  style={{
                    color: theme.colors.textMuted,
                    marginBottom: "20px",
                  }}
                >
                  분석 결과가 없습니다
                </h3>
                <p style={{ color: theme.colors.textMuted }}>
                  데이터를 추가하고 분석을 시작해주세요.
                </p>
              </Section>
            )}
          </Content>
        )}

        {activeView === "AIInsight" && <AIInsight />}

        <LoadingOverlay show={loading}>
          <LoadingMessage>
            <h3>🔄 분석 중...</h3>
            <p>데이터를 분석하고 있습니다. 잠시만 기다려주세요.</p>
          </LoadingMessage>
        </LoadingOverlay>

        <DataCleanupModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
        />
      </Container>
    </ThemeProvider>
  );
}

export default App;
