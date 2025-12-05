import { useState, useEffect } from 'react';
import { api, transformData, waitForAnalysisCompleted } from '../services/api';

export const useAnalysis = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 페이지 로드 시 자동으로 결과 불러오기
  useEffect(() => {
    loadResults();
  }, []);

  const loadResults = async () => {
    try {
      const results = await api.getAllResults();
      const modelData = transformData(
        results.fiData,
        results.cmData,
        results.crData,
        results.safeData
      );
      setData(modelData);
      console.log('기존 분석 결과를 불러왔습니다.');
    } catch (err) {
      console.log('이전 분석 결과가 없습니다. 데이터를 추가하고 분석을 시작하세요.');
      // 에러를 상태로 설정하지 않고 조용히 무시
    }
  };

  const startAnalysis = async () => {
    setLoading(true);
    setError(null);

    try {
      // 분석 시작
      await api.startAnalysis();

      // 분석 완료 대기
      await waitForAnalysisCompleted();

      // 결과 불러오기
      await loadResults();

      alert('분석이 완료되었습니다!');
    } catch (err) {
      console.error('분석 실패:', err);
      setError(err.message);
      alert(`분석 중 오류가 발생했습니다: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    loading,
    error,
    startAnalysis,
    refreshResults: loadResults
  };
};
