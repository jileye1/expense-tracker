import styled from 'styled-components';

export const LoginPageStyled = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;

  .auth-container {
    width: 100%;
    max-width: 450px;
  }

  .auth-card {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    border-radius: 24px;
    padding: 40px 32px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
  }

  .auth-header {
    text-align: center;
    margin-bottom: 32px;
    
    h1 {
      color: #2c3e50;
      font-size: 28px;
      font-weight: 700;
      margin-bottom: 12px;
      line-height: 1.2;
    }
    
    p {
      color: #64748b;
      font-size: 16px;
      line-height: 1.5;
      margin: 0;
    }
  }

  .auth-form {
    .form-group {
      margin-bottom: 24px;
      
      label {
        display: block;
        color: #374151;
        font-size: 14px;
        font-weight: 600;
        margin-bottom: 8px;
      }
      
      input {
        width: 100%;
        padding: 12px 16px;
        border: 2px solid #e5e7eb;
        border-radius: 12px;
        font-size: 16px;
        background: #ffffff;
        transition: all 0.2s ease;
        box-sizing: border-box;
        
        &:focus {
          outline: none;
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }
        
        &::placeholder {
          color: #9ca3af;
        }
      }
    }

    .error-message {
      background: #fef2f2;
      border: 1px solid #fecaca;
      color: #dc2626;
      padding: 12px 16px;
      border-radius: 8px;
      font-size: 14px;
      margin-bottom: 20px;
      text-align: center;
    }

    .form-actions {
      margin-bottom: 24px;
      
      button {
        width: 100%;
        &:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
      }
    }
  }

  .auth-toggle {
    text-align: center;
    
    p {
      color: #64748b;
      font-size: 14px;
      margin: 0;
    }
    
    .toggle-button {
      background: none;
      border: none;
      color: #3b82f6;
      font-weight: 600;
      cursor: pointer;
      text-decoration: underline;
      font-size: 14px;
      
      &:hover {
        color: #2563eb;
      }
    }
  }

  /* Responsive design */
  @media (max-width: 480px) {
    padding: 16px;
    
    .auth-card {
      padding: 32px 24px;
    }
    
    .auth-header h1 {
      font-size: 24px;
    }
  }
`;