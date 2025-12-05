const API_BASE_URL = "https://port-0-capstone2-samsung-mig4d3f30c7d6141.sel3.cloudtype.app/api/v1";

export const api = {
  // 분석 결과 조회
  getFeatureImportance: async () => {
    const response = await fetch(`${API_BASE_URL}/feature-importance`);
    if (!response.ok) throw new Error('Feature importance 조회 실패');
    return response.json();
  },

  getConfusionMatrix: async () => {
    const response = await fetch(`${API_BASE_URL}/confusion-matrix`);
    if (!response.ok) throw new Error('Confusion matrix 조회 실패');
    return response.json();
  },

  getClassificationReport: async () => {
    const response = await fetch(`${API_BASE_URL}/classification-report-rf`);
    if (!response.ok) throw new Error('Classification report 조회 실패');
    return response.json();
  },

  getSafeRegion: async () => {
    const response = await fetch(`${API_BASE_URL}/safe-region`);
    if (!response.ok) throw new Error('Safe region 조회 실패');
    return response.json();
  },

  // 분석 실행
  startAnalysis: async () => {
    const response = await fetch(`${API_BASE_URL}/start-analysis`, {
      method: 'POST'
    });
    if (!response.ok) throw new Error('분석 시작 실패');
    return response.json();
  },

  getAnalysisStatus: async () => {
    const response = await fetch(`${API_BASE_URL}/analysis-status`);
    if (!response.ok) throw new Error('분석 상태 조회 실패');
    return response.json();
  },

  // 파일 업로드
  uploadSingleFile: async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${API_BASE_URL}/upload-csv`, {
      method: 'POST',
      body: formData
    });
    if (!response.ok) throw new Error('파일 업로드 실패');
    return response.json();
  },

  uploadMultipleFiles: async (files) => {
    const formData = new FormData();
    files.forEach(file => {
      formData.append('files', file);
    });

    const response = await fetch(`${API_BASE_URL}/upload-multiple-csv`, {
      method: 'POST',
      body: formData
    });
    if (!response.ok) throw new Error('파일 업로드 실패');
    return response.json();
  },

  // 센서 파일 관리
  getSensorFiles: async () => {
    const response = await fetch(`${API_BASE_URL}/sensor-files`);
    if (!response.ok) throw new Error('센서 파일 목록 조회 실패');
    return response.json();
  },

  deleteSensorFile: async (filename) => {
    const encodedName = encodeURIComponent(filename);
    const response = await fetch(`${API_BASE_URL}/sensor-files/${encodedName}`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error('파일 삭제 실패');
    return response.text();
  },

  // 모든 결과 한번에 조회
  getAllResults: async () => {
    const [fiData, cmData, crData, safeData] = await Promise.all([
      api.getFeatureImportance(),
      api.getConfusionMatrix(),
      api.getClassificationReport(),
      api.getSafeRegion()
    ]);

    return { fiData, cmData, crData, safeData };
  }
};

// 데이터 변환 유틸리티
export const transformData = (fiData, cmData, crData, safeData) => {
  const mapping = { temp: "온도(temp)", press: "압력(press)", humid: "습도(humid)" };

  return {
    featureImportance: fiData.feature_importance || {},
    confusionMatrix: cmData.confusion_matrix || {},
    metrics: {
      accuracy: crData.accuracy || 0,
      class0: {
        precision: crData['0']?.precision || 0,
        recall: crData['0']?.recall || 0,
        f1: crData['0']?.['f1-score'] || 0,
        support: crData['0']?.support || 0
      },
      class1: {
        precision: crData['1']?.precision || 0,
        recall: crData['1']?.recall || 0,
        f1: crData['1']?.['f1-score'] || 0,
        support: crData['1']?.support || 0
      }
    },
    safeRegion: Object.keys(safeData).reduce((acc, key) => {
      const label = mapping[key] || key;
      acc[label] = safeData[key];
      return acc;
    }, {})
  };
};

// 분석 완료 대기
export const waitForAnalysisCompleted = async ({
  intervalMs = 2000,
  timeoutMs = 5 * 60 * 1000
} = {}) => {
  const startTime = Date.now();

  while (true) {
    const data = await api.getAnalysisStatus();
    const status = data.status;

    if (status === 'completed') {
      return;
    }
    if (status === 'error') {
      throw new Error(data.result?.error || '분석 중 오류 발생');
    }

    if (Date.now() - startTime > timeoutMs) {
      throw new Error('분석이 너무 오래 걸립니다. (timeout)');
    }

    await new Promise(resolve => setTimeout(resolve, intervalMs));
  }
};
