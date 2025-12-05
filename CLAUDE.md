# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 프로젝트 개요

전해탈지 공정 데이터 분석을 위한 캡스톤 프로젝트의 프론트엔드 시각화 웹사이트입니다. 백엔드 API와 연동하여 머신러닝 모델 결과와 데이터를 관리하는 단일 페이지 애플리케이션입니다.

## 아키텍처

### 애플리케이션 구조
- **단일 페이지 애플리케이션**: 모든 기능이 `index.html`에 포함 (1018줄)
- **빌드 프로세스 없음**: 순수 HTML/CSS/JavaScript, 외부 CDN 의존성만 사용
- **Chart.js 통합**: CDN을 통해 Chart.js 4.4.0 사용
- **RESTful API 클라이언트**: `https://port-0-capstone2-samsung-mig4d3f30c7d6141.sel3.cloudtype.app/api/v1` 백엔드와 통신

### 주요 파일
- `index.html` - 메인 애플리케이션 (프로덕션 버전)
- `html/first_UI.html` - 초기 UI 버전
- `html/2차멘토링피드백목적.html` - 멘토링 피드백용 버전
- `README.md` - 프로젝트 설명

### 언어
UI 텍스트, 주석, 문서는 모두 한국어입니다. 커밋 메시지는 `Add:`, `Fix:`, `Update:` 패턴을 따릅니다.

## 핵심 기능

### 1. 데이터 분석 뷰
- **요약 카드**: 4개의 주요 지표 표시 (정확도, 정밀도, 재현율, F1-score)
- **혼동 행렬(Confusion Matrix)**: `/confusion-matrix` 엔드포인트 데이터를 Chart.js 바 차트로 시각화
- **특성 중요도(Feature Importance)**: `/feature-importance` 엔드포인트에서 모델 특성 가중치를 바 차트로 표시
- **분류 리포트**: "정상"과 "불량" 클래스의 정밀도/재현율/F1 점수를 테이블로 표시
- **안전 영역(Safe Region)**: 온도/압력/습도의 안전 운영 파라미터 범위 표시

### 2. AI 해설 뷰
- AI 생성 분석 설명을 위한 탭
- 현재는 "대기 중" 플레이스홀더 메시지 표시

### 3. 데이터 관리
- **파일 업로드**: `/upload-csv` 또는 `/upload-multiple-csv`를 통한 단일/다중 CSV 파일 업로드
- **파일 정리 모달**: `/sensor-files` 엔드포인트를 통해 업로드된 센서 파일 목록 표시 및 삭제 기능
- **분석 트리거**: 수동 "분석 시작" 버튼 또는 업로드 후 자동 실행

## API 연동

### Base URL
```javascript
const API_BASE_URL = "https://port-0-capstone2-samsung-mig4d3f30c7d6141.sel3.cloudtype.app/api/v1";
```

### 사용 엔드포인트
- `GET /feature-importance` - 특성 중요도 점수 반환
- `GET /confusion-matrix` - 혼동 행렬 데이터 반환
- `GET /classification-report-rf` - Random Forest 분류 지표 반환
- `GET /safe-region` - 안전 운영 파라미터 범위 반환
- `POST /start-analysis` - 백엔드 ML 분석 시작
- `GET /analysis-status` - 분석 완료 상태 폴링
- `POST /upload-csv` - 단일 CSV 파일 업로드
- `POST /upload-multiple-csv` - 다중 CSV 파일 업로드
- `GET /sensor-files` - 업로드된 센서 파일 목록 조회
- `DELETE /sensor-files/{filename}` - 특정 센서 파일 삭제

### 분석 플로우
1. 사용자가 CSV 파일 업로드
2. 선택적: `runFullAnalysisFlow()`를 통해 분석 트리거
3. `/start-analysis`를 통해 백엔드 처리 시작
4. 프론트엔드가 `/analysis-status`를 2초마다 폴링 (5분 타임아웃)
5. 상태 값: `"running"`, `"completed"`, `"error"`
6. 완료 시, 모든 시각화 데이터를 가져와 렌더링

## 주요 함수

### 데이터 변환
- `transformData(fiData, cmData, crData, safeData)` - API 응답을 통합 모델 형식으로 변환
- 센서 타입 매핑: `{temp: "온도(temp)", press: "압력(press)", humid: "습도(humid)"}`

### 비동기 워크플로우
- `fetchResultsAndRender()` - 4개 API 엔드포인트 병렬 fetch 후 차트/테이블 렌더링
- `runFullAnalysisFlow()` - 분석 시작 → 완료 대기 → fetch 및 렌더링
- `waitForAnalysisCompleted({intervalMs, timeoutMs})` - 타임아웃이 있는 폴링 루프

### UI 업데이트
- `updateSummaryCards(metrics)` - 분류 리포트 데이터로 4개 지표 카드 업데이트
- `initCharts(modelData)` - 혼동 행렬 및 특성 중요도 차트 생성
- `updateTable(metrics)` - 분류 리포트 테이블 채우기
- `switchView(view)` - "DataAnalysis"와 "AIInsight" 탭 전환

### 파일 관리
- `loadSensorFiles()` - 모달에 업로드된 파일 목록 가져와 표시
- `deleteSensorFile(encodedName)` - 확인 후 파일 삭제

## 개발 워크플로우

### 테스트
브라우저에서 `index.html`을 직접 열면 됩니다. 빌드 단계가 필요 없습니다.

### 디버깅
- 브라우저 콘솔에서 `console.error()` 출력 확인
- 모든 API 에러는 `alert()`로 표시됨
- 분석 오버레이는 처리 중 "분석 중..." 표시

### 변경 사항 적용
1. `index.html` 직접 수정
2. 브라우저 새로고침하여 변경 사항 확인
3. API 연결 테스트 (백엔드가 실행 중이어야 함)

### 일반적인 수정 패턴
- **새 차트 추가**: canvas 요소 생성, context 가져오기, Chart.js 생성자 사용
- **API 엔드포인트 추가**: 적절한 비동기 함수에 fetch 호출 추가, 응답 처리
- **스타일 업데이트**: `index.html` 상단의 `<style>` 블록 수정
- **지표 표시 변경**: `updateSummaryCards()` 또는 `updateTable()` 함수 업데이트

## 기술적 제약사항

- **패키지 매니저 없음**: 모든 의존성은 CDN을 통해
- **TypeScript 없음**: 순수 JavaScript만 사용
- **번들러 없음**: 단일 HTML 파일 배포
- **상태 관리 라이브러리 없음**: 직접 DOM 조작
- **Chart.js 제한사항**: 차트는 각 렌더링마다 재생성됨 (업데이트 아님)

## 색상 스킴
- 주 그라디언트: `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`
- 배경: `linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)`

## 브랜치 정보
- 메인 브랜치: `main`
- 현재 개발 브랜치: `dashboard`
