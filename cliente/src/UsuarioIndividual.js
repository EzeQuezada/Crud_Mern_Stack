import axios from 'axios';
import React,{useEffect} from 'react';
import  {Link} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

function UsuarioIndividual({usuario}){

  const navegar = useNavigate();

  //Para animacion de scrooll al bajar
  useEffect(() => {
    AOS.init();
  }, []);
  //function para borrar usuario
  function borrarUsuario(idUsuario){
    axios.post("/api/usuario/borrarUsuario", { idUsuario: idUsuario }) 
      .then((res) => {
        console.log(res.data);
        alert(res.data);
        navegar(0);
      }).catch((err) => {
        console.log(err);
      }); 
    }
  return (
    <div className="container">
      <div className="row">
        <div className='col-sm-6 offset-3' data-aos="flip-right"> 
        <ul className="list-group">
          <li className='list-group-item'>{usuario.idUsuario}</li>
          <li className='list-group-item'>{usuario.nombre}</li>
          <li className='list-group-item'>{usuario.email}</li>
          <li className='list-group-item'>{usuario.telefono}</li>
        </ul>

        <Link to={`/editarUsuario/${usuario.idUsuario}`}><li className='btn btn-success'>Editar</li></Link>

        &nbsp;
        <button className='btn btn-danger' onClick={()=>{borrarUsuario(usuario.idUsuario)}}>Eliminar</button>
        <hr className='mt-4'></hr>
        </div>
      </div>
    </div>
  );
}

export default UsuarioIndividual;