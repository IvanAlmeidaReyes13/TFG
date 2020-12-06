import React, { useState, useEffect } from "react";
import { auth, firebase, db, storage } from "../components/firebase";

const Comentarios = (peliculaComentarios) => {
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  const [historialComentarios, setHistorialComentarios] = useState([]);
  const [tenemosHistorial, setTenemosHistorial] = useState(false);
  const [comentario, setComentario] = useState(undefined);
  const pelicula = peliculaComentarios.peliculaComentarios;

  /*const infoComentario = JSON.stringify({
    displayName: usuario.displayName,
    comentario: comentario,
    pelicula: pelicula.titulo,
  });*/

  const comentar = async () => {
    const historial = await db
      .collection("comentarios")
      .doc(pelicula.titulo)
      .collection(usuario.displayName);
    historial.add({
      comentario: comentario,
      usuario: usuario.displayName,
    });
    setComentario("");
  };
  
  useEffect(() => {
    const traerComentario = () => {
        try {
            var datos = [];
            db.collection("comentarios")
              .doc(pelicula.titulo)
              .collection(usuario.displayName)
              .get()
              .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                  datos.push({ ...doc.data() });
                });
              });
    
            setHistorialComentarios(datos);
            console.log(historialComentarios);
          } catch (error) {
            console.log(error);
          }
    };
    traerComentario();
    //setTenemosHistorial(true)
  }, [pelicula]);

  const verComentarios = async() => {
    try {
        var datos = [];
        await db.collection("comentarios")
          .doc(pelicula.titulo)
          .collection(usuario.displayName)
          .get()
          .then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
              datos.push({ ...doc.data() });
            });
          });

        setHistorialComentarios(datos);
        console.log(historialComentarios);
      } catch (error) {
        console.log(error);
      }
    setTenemosHistorial(true);
  };

  return (
    <div className="container">
      <div className="container">
        <textarea
          value={comentario}
          onChange={(e) => setComentario(e.target.value)}
          placeholder="Comenta..."
          className="form-control mt-5"
          name="comentario"
          id="comentario"
          cols="5"
          rows="4"
        ></textarea>
        <button
          onClick={() => {
            comentar();
          }}
          className="btn-dark btn float-right my-2"
        >
          Comentar
        </button>

        <button
          onClick={() => {
            verComentarios();
          }}
          className="btn-dark btn-block mt-3"
        >
          Ver comentarios
        </button>
      </div>

      {tenemosHistorial &&
        historialComentarios.map((item) => (
          <div className="text-center" key={item.comentario}>
            <div className="card text-center mt-4">
              <div className="card-body">
                <div className="card-text">{item.comentario} </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Comentarios;
