import React, { useState } from 'react';
import { loginUser } from '../services/api';

const LoginForm = ({ isOpen, onClose, onOpen, onSubmitId, onSubmit }) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  function handleClick(){
    onClose();
    onOpen();
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage('');
    setError('');

    try {
      const response = await loginUser({ email, password });
      setMessage(response.data.message);

      onSubmitId(response.data.user.id)
      onSubmit(response.data.user.nick);
    } catch (err) {
      if (err.response) {
        setError(err.response.data.error || 'An error occurred');
      } else {
        setError('Failed to connect to the server');
      }
    }
  };

  if (!isOpen) return null;

  return (
      <div className="row justify-content-center mt-4">
        <div className="col-md-10">
          <div className="card">
            <div className="card-header bg-primary text-white text-center encabezado">
              <h4>Login</h4>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100 boton">
                  Login
                </button>
              </form>
              <button className="btn btn-primary w-100 boton mt-2" onClick={handleClick}>Registrarse</button>
              <button className="btn btn-primary w-100 boton mt-2" onClick={onClose}>Cerrar</button>
              {message && <div className="alert alert-success mt-3">{message}</div>}
              {error && <div className="alert alert-danger mt-3">{error}</div>}
            </div>
          </div>
        </div>
      </div>
  );
};

export default LoginForm;