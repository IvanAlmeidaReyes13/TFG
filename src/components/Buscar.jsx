import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { obtenerPeliculaQueryAccion } from "../redux/peliculasDucks";
import Carousel from "react-bootstrap/Carousel";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";


const Peliculas = () => {
  const dispatch = useDispatch();
  //los estados establecen la consulta que se ejecutará y si hay algun error
  const [query, setQuery] = useState("");
  const [error, setError] = useState(null);
  var Peliculas = useSelector((store) => store.peliculas.query);
  const pathImg = "http://image.tmdb.org/t/p/w185/";
  
  //si la busqueda esta vacia se le pedira que introduzca algun parametro
  const procesarDatos = (e) => {
    e.preventDefault();
    if (!query.trim()) {
      setError("Ingrese parametros de  busqueda");
      return;
    }
    setError(null);
    
    dispatch(obtenerPeliculaQueryAccion(query));
    console.log(Peliculas)
  };
  
  
  return (
    <div className="row">
      <div className="col-md-12">
        {error && <div className="alert alert-danger">{error}</div>}
        <div className="d-flex justify-content-center text-center">
          <form onSubmit={procesarDatos}>
            <input
              type="text"
              className="form-control my-2"
              placeholder="Ingrese su busqueda"
              onChange={(e) => setQuery(e.target.value)}
            />
            <button className="btn btn-dark btn-block" type="submit">
              Buscar
            </button>
          </form>
        </div>
        <div
          style={{ height: "100%", width: "70vw" }}
          className="container-fluid bg-dark mt-4 pb-5"
        >
          {Peliculas && (
            <Carousel touch fade className="container-fluid">
                
              {Peliculas.results.map((item) => (
                <Carousel.Item interval={1000}>
                    {item['poster_path']?(

                        <Image 
                          style={{
                            display: "block",
                            margin: "auto",
                            marginTop: "50px",
                            width: "15%",
                          }}
                          src={pathImg + item["poster_path"]}
                        />
                    ):(
            <div className="alert alert-danger">No hay imagen disponible</div>
                    )}
                  <Container
                    className="bg-dark"
                    style={{
                      background: "rgba(0,0,0,0)",
                      marginTop: "5%",
                      paddingBottom: "5%",
                      color: "white",
                      textAlign: "center",
                    }}
                    fluid
                  >
                    <h3>{item["title"]}</h3>
                    {item['overview']?
                        (<p>{item["overview"]}</p>):(
                            <div className="alert alert-danger">No hay descripcion disponible</div>
                        )
                  
                    }
                  </Container>
                  
                  
                </Carousel.Item>
              ))}
            </Carousel>
          )}
        </div>
      </div>
    </div>
  );
};

export default Peliculas;
