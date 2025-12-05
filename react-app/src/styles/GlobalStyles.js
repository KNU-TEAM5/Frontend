import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    padding: 20px;
    min-height: 100vh;
  }

  table {
    width: 100%;
    border-collapse: collapse;
  }

  th, td {
    padding: 15px;
    text-align: center;
    border-bottom: 1px solid #e9ecef;
  }

  th {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    font-weight: 600;
  }

  tr:hover {
    background: #f8f9fa;
  }
`;

export const theme = {
  colors: {
    primary: '#667eea',
    primaryDark: '#5568d3',
    secondary: '#764ba2',
    secondaryDark: '#653a8b',
    background: '#f5f7fa',
    backgroundGradient: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
    primaryGradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    primaryGradientHover: 'linear-gradient(135deg, #5568d3 0%, #653a8b 100%)',
    white: '#ffffff',
    text: '#2c3e50',
    textLight: '#495057',
    textMuted: '#7f8c8d',
    border: '#e9ecef',
    cardShadow: 'rgba(102, 126, 234, 0.3)',
    lightBackground: '#f8f9fa',
  },
  shadows: {
    small: '0 2px 10px rgba(0, 0, 0, 0.1)',
    medium: '0 4px 15px rgba(102, 126, 234, 0.3)',
    large: '0 10px 40px rgba(0, 0, 0, 0.1)',
  },
  borderRadius: {
    small: '4px',
    medium: '8px',
    large: '12px',
    xlarge: '16px',
  },
};
