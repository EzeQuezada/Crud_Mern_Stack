import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function EditarUsuario() {
  const params = useParams();

  // Hooks para los campos de usuario
  const [nombre, setNombre] = useState(""); 
  const [email, setEmail] = useState(""); 
  const [telefono, setTelefono] = useState(""); 

  // Cargar los datos del usuario al principio
  useEffect(() => {
    axios
      .post("/api/usuario/obtenerUsuarioPorId", { idUsuario: params.idUsuario })
      .then((res) => {
        console.log(res.data[0]);
        const dataUsuarios = res.data[0];

        setNombre(dataUsuarios.nombre);
        setEmail(dataUsuarios.email);
        setTelefono(dataUsuarios.telefono);
      })
      .catch((err) => {
        console.error("Error al cargar el usuario", err);
      });
  }, [params.idUsuario]); // Agregado params.idUsuario a las dependencias

  // Función para editar el usuario
  function editarUsuario() {
    // Aquí puedes hacer una solicitud para actualizar los datos del usuario
    const usuarioActualizado = {
      idUsuario: params.idUsuario, // Asegúrate de enviar el ID del usuario
      nombre,
      email,
      telefono,
    };

    axios
      .post("/api/usuario/actualizarUsuario/", usuarioActualizado)
      .then((res) => {
        console.log("Usuario actualizado:", res.data);
        alert(res.data)
        // Podrías redirigir o mostrar un mensaje de éxito
      })
      .catch((err) => {
        console.error("Error al actualizar el usuario", err);
      });
  }

  return (
    <div className="container">
      <div className="mt-3">
        <h2>Editar Usuario</h2>
      </div>

      <div className="row">
        <div className="col-sm-6 offset-3">
          <div className="mb-3">
            <label htmlFor="nombre" className="form-label">
              Nombre
            </label>
            <input
              type="text"
              className="form-control"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)} // Corregido el nombre de la función
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Corregí el nombre de la función
            />
          </div>

          <div className="mb-3">
            <label htmlFor="telefono" className="form-label">
              Teléfono
            </label>
            <input
              type="text"
              className="form-control"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)} // Corregí el nombre de la función
            />
          </div>

          <button onClick={editarUsuario} className="btn btn-success">
            Editar Usuario
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditarUsuario;
