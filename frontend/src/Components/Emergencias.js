import React, { useState, useEffect, Fragment } from 'react'
import axios from 'axios'
import L from 'leaflet'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import uuid from 'react-uuid'

export default function Emergencias() {

    // var listado = []
    // var posicion =[]

    const [ubicaciones, setUbicaciones] = useState([])
    const [radio, setRadio] = useState([])

    const actualizarListado = () => {
        axios.get('http://localhost:5000/listaGrupo?grupo=CentrosEmergencias').then((res) => {
            console.log(res.data)
            setUbicaciones(res.data)
        })
            .catch((error) => {
                console.log(error);
            })
    }

    const radioActual = () => {
        navigator.geolocation.getCurrentPosition(function (position) {
            console.log(position.coords.latitude, position.coords.longitude);

            axios.get(`http://localhost:5000/lugaresRadio?grupo=CentrosEmergencias&longitud=${position.coords.longitude}&latitud=${position.coords.latitude}`).then((res) => {
                // console.log(res.data)         
                setRadio(res.data)
                console.log(radio)

            })
                .catch((error) => {
                    console.log(error);
                })
        });

    }

    const myIcon = L.icon({
        iconUrl: 'https://cdn.icon-icons.com/icons2/794/PNG/128/1-80_icon-icons.com_65644.png',
        iconSize: [25, 41],
        iconAnchor: [12.5, 41],
        popupAnchor: [0, -41]

    })

    const iconoPosActual = {
        iconUrl: 'my-icon.png',
        iconSize: [38, 95],
        iconAnchor: [22, 94],
        popupAnchor: [-3, -76],
        shadowUrl: 'my-icon-shadow.png',
        shadowSize: [68, 95],
        shadowAnchor: [22, 94]
    }


    const style = {
        height: '650px',
        width: '650px',
    }

    const listadito = {
        display: 'flex',
        justifyContent: 'space-around'
    }

    useEffect(() => {

        actualizarListado();
        radioActual();

    }, [])


    return (
        <Fragment>

            <div style={listadito}>

                <Map center={[-32.484402, -58.232802]} zoom={13} style={style} className="mt-4" >
                    <TileLayer
                        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    {ubicaciones.map(ubi => (

                        <Marker
                            key={uuid()}
                            position={[ubi.latitud, ubi.longitud]} icon={myIcon}>
                            <Popup>
                                {ubi.nombre}
                            </Popup>

                        </Marker>
                    ))}

                </Map>

                <div class="mt-5" align="center">
                    <div >
                        <h2>Centros de Salud</h2>
                        <p>Que se encuentran en un radio de 5 Km. de ud.</p>

                        <table class="table col-xl-12" >
                            <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Distancia</th>
                                </tr>
                            </thead>
                            <tbody>
                                {radio.map(ra => (
                                    <tr>
                                        <td>{ra[0]}</td>
                                        <td align="center">{ra[1]} kms</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                    </div>
                </div>
            </div>

        </Fragment>
    )
}