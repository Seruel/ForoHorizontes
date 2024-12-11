import React from 'react';

const Footer = () => {
  return (
    <footer className="text-white mt-3 footer">
      <div className="container py-3">
        <div className="row">
          <div className="col-md-6">
            <h5>Sobre el Foro</h5>
            <p>
              Este es un foro comunitario donde los usuarios pueden compartir conocimientos, resolver dudas y participar en discusiones.
            </p>
          </div>
          <div className="col-md-3">
            <h5>Enlaces Rápidos</h5>
            <ul className="list-unstyled">
              <li><a className="text-white" href="/">Inicio</a></li>
              <li><a className="text-white" href="/topics">Temas</a></li>
              <li><a className="text-white" href="/about">Acerca de</a></li>
              <li><a className="text-white" href="/contact">Contacto</a></li>
            </ul>
          </div>
          <div className="col-md-3">
            <h5>Redes Sociales</h5>
            <ul className="list-unstyled">
              <li><a className="text-white" href="https://facebook.com">Facebook</a></li>
              <li><a className="text-white" href="https://twitter.com">Twitter</a></li>
              <li><a className="text-white" href="https://instagram.com">Instagram</a></li>
            </ul>
          </div>
        </div>
        <div className="text-center mt-2">
          <small>&copy; 2024 Foro Comunitario. Todos los derechos reservados.</small>
        </div>
      </div>
    </footer>
  );
};

export default Footer;