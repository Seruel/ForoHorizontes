import React from 'react';

const UserConfig = ({ isOpen, onClose, onCerrarId, onCerrar }) => {

  function handleClick(){
    onCerrarId('')
    onCerrar('')
  }

  if (!isOpen) return null;

  return (
    <div className="desplegable bg-primary p-3 mt-2">
      <div className="row justify-content-center">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header bg-primary text-white text-center encabezado">
              <h4>configuracion</h4>
            </div>
            <div className="card-body">
              <button className="btn btn-primary w-100 boton mt-2">Modificar Usuario</button>
              <button className="btn btn-primary w-100 boton mt-2">Borrar usuario</button>
              <button className="btn btn-primary w-100 boton mt-2" onClick={handleClick}>Cerrar sesion</button>
              <button className="btn btn-primary w-100 boton mt-4" onClick={onClose}>Cerrar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserConfig;