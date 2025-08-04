import React, { useState } from 'react';
import { useAuthContext } from '../../contexts/AuthContext';
import StyledButton from '../../components/button/styledButton';
import { LoginPageStyled } from './loginStyles';

const LoginPage = () => {
  const { login, register } = useAuthContext();
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // clear error when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      let result;
      if (isLoginMode) {
        result = await login(formData.email, formData.password);
      } else {
        result = await register(formData.name, formData.email, formData.password);
      }

      if (!result.success) {
        setError(result.error);
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setIsLoginMode(!isLoginMode);
    setFormData({ name: '', email: '', password: '' });
    setError('');
  };

  return (
    <LoginPageStyled>
      <div className="login-container">
        <div className="login-card">
          <div className="card-header">
            <h1>Welcome to Your Budgeting App!</h1>
            <p>
              {isLoginMode ? 'Sign in to continue tracking your expenses' : 'Create an account to start tracking your expenses'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            {!isLoginMode && (
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required={!isLoginMode}
                  placeholder="Enter your full name"
                />
              </div>
            )}
            
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                placeholder="Enter your email"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                placeholder="Enter your password"
              />
            </div>

            {error && (
              <div className="error-message">
                {error}
              </div>
            )}

            <div className="submit-button">
              <StyledButton 
                type="submit" 
                name={loading ? 'Loading...' : (isLoginMode ? 'Sign In' : 'Sign Up')} 
                disabled={loading}
              />
            </div>
          </form>

          <div className="login-toggle">
            <p>
              {isLoginMode ? "Don't have an account? " : "Already have an account? "}
              <button 
                type="button" 
                onClick={toggleMode}
                className="toggle-button"
              >
                {isLoginMode ? 'Sign Up' : 'Sign In'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </LoginPageStyled>
  );
};


export default LoginPage;