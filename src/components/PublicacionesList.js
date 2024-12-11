import React, { useState, useEffect } from 'react';
import { fetchPublicaciones, fetchUser } from '../services/api';

const PublicacionesList = ({ categoria }) => {
  const [publicaciones, setPublicaciones] = useState([]);
  const [usuarios, setUsuarios] = useState({});
  const [loading, setLoading] = useState(true);

  // Función para obtener las publicaciones
  const getPublicaciones = async () => {
    try {
      const response = await fetchPublicaciones();
       if (!response.status === 200) {
        throw new Error(`Error: Código de estado ${response.status}`);
    }
      const data = await response;
      console.log('Respuesta de la API:', data);
      setPublicaciones(data.data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  // Usar useEffect para cargar las publicaciones al montar el componente
  useEffect(() => {
    getPublicaciones();
  }, []);

  useEffect(() => {
    const fetchUsuarios = async () => {
      const usuariosCargados = {};
      await Promise.all(
        publicaciones.map(async (publicacion) => {
          try {
            const response = await fetchUser(publicacion.idusuario);
            usuariosCargados[publicacion.idusuario] = response.data.nick;
          } catch (error) {
            console.error(`Error al obtener usuario con ID ${publicacion.idusuario}:`, error.message);
          }
        })
      );
      setUsuarios(usuariosCargados);
    };
  
    if (publicaciones.length > 0) {
      fetchUsuarios();
    }
  }, [publicaciones]);

  const publicacionesFiltradas = categoria
    ? publicaciones.filter((publicacion) => publicacion.categoria === categoria)
    : publicaciones;

  var busqueda = "";

  if(categoria === "General"){
    busqueda = publicaciones;
  } else {
    busqueda = publicacionesFiltradas;
  }

  // Renderizar
  if (loading) {
    return <div>Cargando publicaciones...</div>;
  }

  return (
    <div className="container mt-4 mb-5">
      <h1 className="text-center mb-4 display-4 text-primary border-bottom pb-3 titulo">{categoria}</h1>
      <div className="row justify-content-center">
        {busqueda.map((publicacion) => (
          <div className="col-md-10 mt-5" key={publicacion.id}>
            <div className="card h-100 shadow-sm">
            <div className="card-header">
                {usuarios[publicacion.idusuario]
                ? `Publicado por: ${usuarios[publicacion.idusuario]}`
                : 'Cargando usuario...'}
            </div>
              <div className="card-body">
                <h5 className="card-title">{publicacion.titulo}</h5>
                <p className="card-text">{publicacion.contenido}</p>
              </div>
              <div className="card-footer text-muted">
                Publicado el {publicacion.fecha}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PublicacionesList;