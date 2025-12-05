import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { api } from '../services/api';

const ModalOverlay = styled.div`
  display: ${props => props.isOpen ? 'flex' : 'none'};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 40px;
  border-radius: ${props => props.theme.borderRadius.large};
  max-width: 600px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: ${props => props.theme.shadows.large};
`;

const ModalTitle = styled.h2`
  font-size: 1.8em;
  color: ${props => props.theme.colors.text};
  margin-bottom: 20px;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  font-size: 1.5em;
  cursor: pointer;
  color: ${props => props.theme.colors.textMuted};

  &:hover {
    color: ${props => props.theme.colors.text};
  }
`;

const FileList = styled.div`
  margin-top: 20px;
`;

const FileItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  margin-bottom: 10px;
  background: ${props => props.theme.colors.lightBackground};
  border-radius: ${props => props.theme.borderRadius.medium};
`;

const FileName = styled.span`
  flex: 1;
  word-break: break-all;
`;

const DeleteButton = styled.button`
  padding: 8px 16px;
  background: #dc3545;
  color: white;
  border: none;
  border-radius: ${props => props.theme.borderRadius.small};
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;

  &:hover {
    background: #c82333;
    transform: translateY(-2px);
  }
`;

const EmptyMessage = styled.p`
  text-align: center;
  color: ${props => props.theme.colors.textMuted};
  padding: 40px;
`;

const LoadingMessage = styled.p`
  text-align: center;
  color: ${props => props.theme.colors.primary};
  padding: 40px;
`;

export const DataCleanupModal = ({ isOpen, onClose }) => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isOpen) {
      loadFiles();
    }
  }, [isOpen]);

  const loadFiles = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.getSensorFiles();
      setFiles(data.files || []);
    } catch (err) {
      console.error('파일 목록 조회 실패:', err);
      setError('파일 목록을 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (filename) => {
    if (!window.confirm(`정말 삭제할까요?\n${filename}`)) {
      return;
    }

    try {
      await api.deleteSensorFile(filename);
      alert('파일이 삭제되었습니다.');
      loadFiles(); // 목록 새로고침
    } catch (err) {
      console.error('파일 삭제 실패:', err);
      alert('파일 삭제에 실패했습니다.');
    }
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay isOpen={isOpen} onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalTitle>📁 업로드된 센서 파일 관리</ModalTitle>

        {loading && <LoadingMessage>파일 목록을 불러오는 중...</LoadingMessage>}

        {error && <EmptyMessage>{error}</EmptyMessage>}

        {!loading && !error && files.length === 0 && (
          <EmptyMessage>업로드된 파일이 없습니다.</EmptyMessage>
        )}

        {!loading && !error && files.length > 0 && (
          <FileList>
            {files.map((file, index) => (
              <FileItem key={index}>
                <FileName>{file}</FileName>
                <DeleteButton onClick={() => handleDelete(file)}>
                  삭제
                </DeleteButton>
              </FileItem>
            ))}
          </FileList>
        )}

        <div style={{ marginTop: '30px', textAlign: 'center' }}>
          <DeleteButton
            onClick={onClose}
            style={{ background: '#6c757d' }}
          >
            닫기
          </DeleteButton>
        </div>
      </ModalContent>
    </ModalOverlay>
  );
};
