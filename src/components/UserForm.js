import React, { useState } from 'react';
import { createUser } from '../services/api';

const UserForm = ({ isOpen, onClose, onSubmitId, onSubmit }) => {
  const [usuario, setUsuario] = useState({
    nombre: '',
    email: '',
    nick: '',
    password: '',
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Manejar los cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsuario((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!usuario.nombre || !usuario.email || !usuario.nick || !usuario.password) {
      alert('Por favor, completa todos los campos.');
      return;
    }
    
    setLoading(true);

    try {
      // Realizamos la solicitud POST a la API
      const response = await createUser({
        nombre: usuario.nombre,
        email: usuario.email,
        nick: usuario.nick,
        password: usuario.password,
      });

      if (response.status === 201) {
        const newUser = response.data;
        onSubmitId(newUser.id)
        onSubmit(newUser.nick)

        setUsuario({
          nombre: '',
          email: '',
          nick: '',
          password: '',
        });
      } else if (response.status === 400) {
        setError('Campos no validos: ' + response.errors);
      } else {
        setError('Error al agregar el usuario.');
      }
    } catch (err) {
      console.log("error: " + err)
      setError('El nick o el correo ya estan en uso');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="desplegable bg-primary p-3 mt-2">
      <div className="row justify-content-center">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header bg-primary text-white text-center encabezado">
                <h4>Registro</h4>
            </div>
            <div className="card-body">
            <form onSubmit={handleSubmit}>
                {error && <div className="alert alert-danger">{error}</div>}
                <div className="mb-3">
                <label htmlFor="nombre" className="form-label">
                    Nombre
                </label>
                <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    className="form-control"
                    value={usuario.nombre}
                    onChange={handleChange}
                    required
                />
                </div>
                <div className="mb-3">
                <label htmlFor="email" className="form-label">
                    Correo Electrónico
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-control"
                    value={usuario.email}
                    onChange={handleChange}
                    required
                />
                </div>
                <div className="mb-3">
                <label htmlFor="nick" className="form-label">
                    Nickname
                </label>
                <input
                    type="text"
                    id="nick"
                    name="nick"
                    className="form-control"
                    value={usuario.nick}
                    onChange={handleChange}
                    required
                />
                </div>
                <div className="mb-3">
                <label htmlFor="password" className="form-label">
                    Contraseña
                </label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    className="form-control"
                    value={usuario.password}
                    onChange={handleChange}
                    required
                />
                </div>
                <button type="submit" className="btn btn-primary w-100 boton" disabled={loading}>
                {loading ? 'Cargando...' : 'Agregar Usuario'}
                </button>
            </form>
            <button className="btn btn-primary w-100 boton mt-4" disabled={loading} onClick={onClose}>Cerrar</button>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default UserForm;