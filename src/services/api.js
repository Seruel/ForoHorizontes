import axios from 'axios';

// Configurar la URL base de la API Flask
const API = axios.create({
    baseURL: 'http://127.0.0.1:5000/api',
});

// Login de usuario
export const loginUser = (data) => API.post('/login', data);

// Crear usuario
export const createUser = (data) => API.post('/usuarios', data);

// Recivir usuarios
export const fetchUsers = () => API.get('/usuarios');

// Recivir un usuario
export const fetchUser = (id) => API.get('/usuarios/' + id);

// Modificar usuario
export const updateUser = (id, data) => API.put('/usuarios/' + id, data);

// Borrar usuario
export const deleteUser = (id) => API.delete('/usuarios' + id);

// Recivir publicaciones
export const fetchPublicaciones = () => API.get('/publicaciones');

// Recivir una publicacion
export const fetchPublicacion = (id) => API.get('/publicaciones/' + id);

// Crear publicacion
export const createPublicacion = (data) => API.post('/publicaciones', data);

