import React from 'react';

const Menu = ({ onCategoria }) => {
    
  const handleClick = (category) => {
    onCategoria(category);
  }

  return (
    <div className="menu p-3 mt-2">
    <nav>
      <ul className="nav flex-column">
        <li className="nav-item">
          <h1 className="nav-link text-white titulo_categorias">Categorias</h1>
        </li>
        <li className="nav-item">
          <a className="nav-link text-white" onClick={() => handleClick("General")}>General</a>
        </li>
        <li className="nav-item">
          <a className="nav-link text-white" onClick={() => handleClick("Videojuegos")}>Videojuegos</a>
        </li>
        <li className="nav-item">
          <a className="nav-link text-white" onClick={() => handleClick("Peliculas")}>Peliculas</a>
        </li>
        <li className="nav-item">
          <a className="nav-link text-white" onClick={() => handleClick("Libros")}>Libros</a>
        </li>
        <li className="nav-item">
          <a className="nav-link text-white" onClick={() => handleClick("Viajes")}>Viajes</a>
        </li>
        <li className="nav-item">
          <a className="nav-link text-white" onClick={() => handleClick("Noticias")}>Noticias</a>
        </li>
      </ul>
    </nav>
    </div>
  );
};

export default Menu;