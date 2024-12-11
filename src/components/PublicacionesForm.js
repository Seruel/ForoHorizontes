import React, { useState } from 'react';
import { createPublicacion } from '../services/api'; 

const AgregarPublicacion = ({ acceso, idusuario }) => {
  const [publicacion, setPublicacion] = useState({
    titulo: '',
    contenido: '',
    categoria: '',
    idusuario: idusuario,
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const categorias = ['Videojuegos', 'Peliculas', 'Libros', 'Viajes', 'Noticias'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPublicacion((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!publicacion.titulo || !publicacion.contenido || !publicacion.categoria || !publicacion.idusuario) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    setLoading(true); 
    setError(null);
    setSuccessMessage('')

    try {
      const response = await createPublicacion(publicacion);

      if (response.status === 201) {
        const newPublicacion = response.data; 
        setPublicacion({
          titulo: '',
          contenido: '',
          categoria: '', 
          idusuario: idusuario,
        });
        setSuccessMessage('¡Publicación añadida con éxito!');
      } else {
        setError('Error al agregar la publicación.');
      }
    } catch (err) {
      setError('Error de red o servidor');
    } finally {
      setLoading(false); 
    }
  };

  if (!acceso) return null;

  return (
    <div className="p-3 mt-2">
    <div className="row justify-content-center">
      <div className="col-md-10">
        <div className="card">
          <div className="card-header bg-primary text-white text-center encabezado">
            <h2 className="text-center mb-4">Añadir Publicación</h2>
          </div>
          <div className='card-body'>
            <form onSubmit={handleSubmit}>
                {error && <div className="alert alert-danger">{error}</div>}
                {successMessage && <div className="alert alert-success">{successMessage}</div>}
                <div className="mb-3">
                <label htmlFor="titulo" className="form-label">
                    Título
                </label>
                <input
                    type="text"
                    id="titulo"
                    name="titulo"
                    className="form-control"
                    value={publicacion.titulo}
                    onChange={handleChange}
                    required
                />
                </div>
                <div className="mb-3">
                <label htmlFor="contenido" className="form-label">
                    Contenido
                </label>
                <textarea
                    id="contenido"
                    name="contenido"
                    className="form-control"
                    rows="5"
                    value={publicacion.contenido}
                    onChange={handleChange}
                    required
                ></textarea>
                </div>
                <div className="mb-3">
                <label htmlFor="categoria" className="form-label">
                    Categoría
                </label>
                <select
                    id="categoria"
                    name="categoria"
                    className="form-select"
                    value={publicacion.categoria}
                    onChange={handleChange}
                    required
                >
                    <option value="" disabled>
                    Selecciona una categoría
                    </option>
                    {categorias.map((cat, index) => (
                    <option key={index} value={cat}>
                        {cat}
                    </option>
                    ))}
                </select>
                </div>
                <button type="submit" className="boton btn btn-primary w-100" disabled={loading}>
                {loading ? 'Cargando...' : 'Agregar Publicación'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgregarPublicacion;