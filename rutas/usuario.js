const express = require('express');
const router = express.Router();

const  mongoose = require('mongoose');
const eschema = mongoose.Schema;



const eschemaUsuario = new eschema({
    nombre: String,
    email: String,
    telefono: String,
    idUsuario: String
});
const ModelUsuario = mongoose.model('Usuario', eschemaUsuario);

module.exports = router;

// Ruta para agregar usuarios
router.post("/agregarUsuario", async (req, res) => {
    try {
        const { nombre, email, telefono, idUsuario } = req.body;

        // Crear un nuevo usuario
        const nuevoUsuario = new ModelUsuario({
            nombre,
            email,
            telefono,
            idUsuario
        });

        // Guardar el usuario con async/await
        await nuevoUsuario.save();

        res.send('Usuario agregado correctamente');
    } catch (error) {
        console.error(error);
        res.status(500).send('Hubo un error al agregar el usuario');
    }
});

//Obtener todos los usuarios
router.get("/obtenerUsuarios", async (req, res) => {
    try {
        const usuarios = await ModelUsuario.find();
        res.json(usuarios);
    } catch (error) {
        console.error(error);
        res.status(500).send('Hubo un error al obtener los usuarios');
    }
});

//Obtener data de usuarios
router.post("/obtenerUsuarioPorId", (req, res) => {
    // Asegúrate de que idUsuario se obtenga desde req.body
    ModelUsuario.find({ idUsuario: req.body.idUsuario })
      .then(docs => {
        res.send(docs);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  });
  

  router.post("/actualizarUsuario", async (req, res) => {
    try {
      const { idUsuario, nombre, email, telefono } = req.body;
  
      const usuarioActualizado = await ModelUsuario.findOneAndUpdate(
        { idUsuario }, // Condición de búsqueda
        { nombre, email, telefono }, // Datos a actualizar
        { new: true } // Opciones: `new` devuelve el documento actualizado
      );
  
      if (!usuarioActualizado) {
        return res.status(404).send("Usuario no encontrado");
      }
  
      res.send("Usuario actualizado correctamente");
    } catch (error) {
      console.error("Error al actualizar el usuario:", error);
      res.status(500).send("Error interno del servidor");
    }
  });

  router.post("/borrarUsuario", async (req, res) => {
    const { idUsuario } = req.body;
  
    // Validar que se haya proporcionado el ID
    if (!idUsuario) {
      return res.status(400).send("El ID del usuario es requerido");
    }
  
    try {
      // Buscar y eliminar el usuario por ID
      const usuarioEliminado = await ModelUsuario.findOneAndDelete({ idUsuario });
  
      if (!usuarioEliminado) {
        return res.status(404).send("Usuario no encontrado");
      }
  
      res.send("Usuario eliminado correctamente");
    } catch (error) {
      console.error("Error al eliminar el usuario:", error);
      res.status(500).send("Error interno del servidor");
    }
  });
  
