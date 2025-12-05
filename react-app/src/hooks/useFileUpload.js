import { useRef } from 'react';
import { api } from '../services/api';

export const useFileUpload = (onUploadComplete) => {
  const fileInputRef = useRef(null);

  const handleFileSelect = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (event) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    try {
      if (files.length === 1) {
        await api.uploadSingleFile(files[0]);
      } else {
        await api.uploadMultipleFiles(Array.from(files));
      }

      const doAnalyze = window.confirm(
        '파일 업로드가 완료되었습니다. 이 데이터로 바로 분석을 시작할까요?'
      );

      if (onUploadComplete) {
        onUploadComplete(doAnalyze);
      }
    } catch (err) {
      console.error('파일 업로드 실패:', err);
      alert('파일 업로드 중 오류가 발생했습니다.');
    } finally {
      event.target.value = '';
    }
  };

  return {
    fileInputRef,
    handleFileSelect,
    handleFileChange
  };
};
