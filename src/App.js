import React, {Fragment, useState, useEffect} from 'react';
import Header from './Components/Header'
import Formulario from './Components/Formulario'
import Clima from './Components/Clima'
import Error from './Components/Error'

function App() {

    const [busqueda, guardarBusqueda] = useState({
        ciudad: '',
        pais: ''
    })

    const [consultar, guardarConsultar] = useState(false)
    const [resultado, guardarResultado] = useState({})
    const [error, guardarError] = useState(false)

    const {ciudad, pais} = busqueda;

    useEffect(()=>{
        const consultarAPI = async ()=>{
            if(consultar){
                const appId = 'e591da1d632b8dd0e5bcc93a1e7e2fc4';
                const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`

                const respuesta = await fetch(url);
                const resultado = await respuesta.json()

                guardarResultado(resultado)
                guardarConsultar(false)

                {resultado.cod === "404" ? guardarError(true) : guardarError(false)}
            }
        }
        consultarAPI()
    }, [consultar])

    let componente;
    {error 
    ? 
        componente = <Error 
        mensaje="No hay resultados"
        /> 
    : 
        componente = <Clima resultado = {resultado} />}


  return (
    <Fragment>
        <Header
            titulo="Clima React App"
        />
        <div className="contenedor-form">
            <div className="container">
                <div className="row">
                    <div className="col m6 s12">
                        <Formulario
                            busqueda= {busqueda}
                            guardarBusqueda={guardarBusqueda}
                            guardarConsultar={guardarConsultar}
                        />
                    </div>
                    <div className="col m6 s12">
                        {componente}
                    </div>
                </div>
            </div>
        </div>
    </Fragment>
  );
}

export default App;
