import React, { useState, useEffect } from "react";
import { db } from "../components/firebase";

const Comentarios = (peliculaComentarios) => {
  console.log(peliculaComentarios)
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const pelicula = peliculaComentarios.peliculaComentarios;
//los estados nos indican el historial de comentarios, si es que existe, el comentario actual y la fecha de hoy
  const [historialComentarios, setHistorialComentarios] = useState([]);
  const [tenemosHistorial, setTenemosHistorial] = useState(false);
  const [comentario, setComentario] = useState(undefined);
  const [fechaDeHoy, setFechaDeHoy] = useState(null);

  const fechaDeHoyFun = (fechaparam) => {
    let fecha = new Date(fechaparam);
    let dia = fecha.getDate();
    let mes = fecha.getMonth();
    let anio = fecha.getFullYear();
    let fechaFinal = dia + "/" + (mes + 1) + "/" + anio;
    return fechaFinal;
  };

  //funcion para añadir los comentarios a la bbdd
  const comentar = async () => {
    fechaDeHoyFun();

    const historial = await db.collection("comentarios");
    //.doc(pelicula.titulo)

    const nuevoComentario = {
      comentario: comentario,
      pelicula: pelicula.titulo,
      usuario: usuario.displayName,
      fecha: Date.now(),
    };
    historial.add(nuevoComentario);
    setComentario("");
  };
//al acabar de cargar tratara de cargar los comentario para tenerlos establecidos
  useEffect(() => {
   
    verComentarios();
   
  }, [pelicula]);

  //Trae los comentarios que coinciden con la pelicula que se nos esta mostrando
  const verComentarios = async () => {
    try {
      
      const info=[]
      var datos = await db.collection("comentarios");
      datos
      .where("pelicula", "==", pelicula.titulo)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          
          info.push([doc.data()]);
        });
      })
        .catch(function (error) {
          console.log("Error getting documents: ", error);
        });
        setHistorialComentarios(info);
        //console.log(historialComentarios);
        
    } catch (error) {
      console.log(error);
    }
  };

  console.log(historialComentarios)
  return (
    <div className="container mb-5">
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
            verComentarios()},()=>{setTenemosHistorial(true)}
          }
          className="btn-dark btn-block mt-3"
        >
            Ver comentarios
            
        </button>
      </div>

      {tenemosHistorial===true&&
        historialComentarios.map((item) => (
          <div className="text-center" key={item[0].comentario}>
            <div className="card text-center mt-4">
              <div className="card-body">
                <strong className="float-left mr-2">{item[0].usuario}: </strong>
                <div className="float-left"> {item[0].comentario} </div>
                <span className="float-right">{fechaDeHoyFun(item[0].fecha)}</span>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Comentarios;
