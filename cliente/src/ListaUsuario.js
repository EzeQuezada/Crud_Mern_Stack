import React, { useEffect,useState } from 'react';
import UsuarioIndividual from './UsuarioIndividual';
import axios from 'axios';

function ListaUsuario() {

  const [dataUsuarios, setDataUsuarios] = useState([]);
  
  useEffect(() => {
    axios.get('/api/usuario/obtenerUsuarios')
    .then(res => {
        console.log(res.data)
        setDataUsuarios(res.data)
      }).catch(error => {
        console.log(error)
      })
  }, []);

  //Mapear los datos de usuarios y mostrarlos en la lista
  const listaUsuarios = dataUsuarios.map(usuario=>{
    return(
      <div>
        <UsuarioIndividual usuario={usuario} />
      </div>
    )
  })

  return (
    <div>
      <h2>Lista de Usuarios</h2>
      {listaUsuarios}   
    </div>
  );
}

export default ListaUsuario;