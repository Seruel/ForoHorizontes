import React, { useState ,useEffect } from 'react';
import Header from './components/Header.js';
import Footer from './components/Footer.js';
import LoginForm from './components/LoginForm.js';
import PublicacionesList from './components/PublicacionesList.js';
import PublicacionesForm from './components/PublicacionesForm.js';
import Menu from './components/Menu.js';
import UserForm from './components/UserForm.js';
import UserConfig from './components/UserConfig.js';
import { useLocalStorage } from './useLocalStorage.js';

function App() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [categoria, setCategoria] = useState("General");
  const [acceso, setAcceso] = useState(false);
  const [idusuario, setIdusuario] = useLocalStorage('idusuario','')
  const [usuario, setUsuario] = useLocalStorage('usuario','')

  const openLogin = () => setIsLoginOpen(true);
  const closeLogin = () => setIsLoginOpen(false);

  const openForm = () => setIsFormOpen(true);
  const closeForm = () => setIsFormOpen(false);

  const openConfig = () => setIsConfigOpen(true);
  const closeConfig = () => setIsConfigOpen(false);

  const selectCategoria = (categoria) => setCategoria(categoria);
  const insertIdusuario = (idusuario) => setIdusuario(idusuario);
  const insertUsuario = (usuario) => setUsuario(usuario);

  useEffect (() => {
    if (idusuario != ''){
      setAcceso(true)
      closeLogin()
      closeForm()
    } else {
      setAcceso(false)
      closeConfig()
    }
  }, [idusuario])

  useEffect (() => {
    if(isLoginOpen){
      closeForm()
    }
  }, [isLoginOpen])

  return (
    <div className='root container-fluid'>
        <Header onOpen={openLogin} onConfig={openConfig} usuario={usuario} acceso={acceso}/>
        <div className="d-flex app-container col-12">
          <div className="d-flex flex-column flex-md-row app-container col-12">
            <div className="menu-container col-12 col-md-2 mb-3 mb-md-0">
              <Menu onCategoria={selectCategoria} />
            </div>

            <div className={`content-container ${isLoginOpen || isFormOpen || isConfigOpen ? 'col-12 col-md-7' : 'col-12 col-md-10'}`}>
              <PublicacionesForm acceso={acceso} idusuario={idusuario} />
              <PublicacionesList categoria={categoria} />
            </div>

            <div className={`desplegable ${isLoginOpen || isFormOpen || isConfigOpen ? 'col-12 col-md-3' : 'd-none'} mt-2`}>
              <LoginForm className="w-100" isOpen={isLoginOpen} onClose={closeLogin} onOpen={openForm} onSubmitId={insertIdusuario} onSubmit={insertUsuario}/>
              <UserForm className="w-100" isOpen={isFormOpen} onClose={closeForm} onSubmitId={insertIdusuario} onSubmit={insertUsuario}/>
              <UserConfig className="w-100" isOpen={isConfigOpen} onClose={closeConfig} onCerrarId={insertIdusuario} onCerrar={insertUsuario}/>
            </div>
          </div>
        </div>
        <Footer />
    </div>
  );
}

export default App;
