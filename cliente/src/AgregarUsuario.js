import React, { useState } from "react"; // Corregido 'UseState' a 'useState'
import uniqid from "uniqid";
import axios from "axios";

function AgregarUsuario() {
  // Hooks
  const [nombre, setNombre] = useState(""); 
  const [email, setEmail] = useState(""); 
  const [telefono, setTelefono] = useState(""); 

  function agregarUsuario() {
    var usuario = {
      nombre: nombre,
      email: email,
      telefono: telefono, 
      idUsuario: uniqid(),
    };
    console.log(usuario);

    axios
      .post("/api/usuario/agregarUsuario", usuario)
      .then((res) => {
        alert(res.data);
      })
      .catch((error) => {
        // Corregido 'then' por 'catch' para capturar errores correctamente
        console.log(error);
      });
  }

  return (
    <div className="container">
      <div className="mt-3">
        <h2>Agregar Usuario</h2>
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
              {" "}
              {/* Cambié 'for' de nombre a telefono */}
              Teléfono
            </label>
            <input
              type="text"
              className="form-control"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)} // Corregí el nombre de la función
            />
          </div>

          <button onClick={agregarUsuario} className="btn btn-success">
            Guardar Usuario
          </button>
        </div>
      </div>
    </div>
  );
}

export default AgregarUsuario;
