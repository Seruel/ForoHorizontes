import React, { useState } from 'react';
import logo from '../imagenes/Logo_Horizontes.png'
import icon from '../imagenes/usuario.png'

const Header = ({ onOpen, onConfig, usuario, acceso }) => {
  const [search, setSearch] = useState('');

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    alert('Funcion no disponible todavía');
  };

  return (
    <header className="bg-primary header">
      <div className="container">
        {/* Añadimos clases responsivas */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center py-1">
          <img src={logo} className="mb-3 mb-md-0" alt="Logo" />
          <form className="d-flex flex-column flex-sm-row nav-item mb-3 mb-md-0" onSubmit={handleSearchSubmit}>
            <input
              type="text"
              className="form-control me-2 mb-2 mb-sm-0"
              placeholder="Buscar..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              required
            />
            <button type="submit" className="btn btn-light">Buscar</button>
          </form>
          <nav>
            <ul className="nav d-flex flex-column flex-sm-row align-items-center">
              <li className="nav-item boton_header">
                {!acceso && (
                  <a className="nav-link text-white" onClick={onOpen}>
                    Iniciar Sesión
                  </a>
                )}
                {acceso && (
                  <div className="d-flex flex-column flex-sm-row align-items-center nav-link">
                    <img src={icon} alt="Usuario" className="me-2 mb-2 mb-sm-0" />
                    <a className="mb-0 text-white" onClick={onConfig}>
                      {usuario}
                    </a>
                  </div>
                )}
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;