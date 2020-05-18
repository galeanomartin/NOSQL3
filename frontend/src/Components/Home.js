import React, { Fragment, useState } from 'react'
import '../Public/EstiloMenu.css'

function Home() {

    navigator.geolocation.getCurrentPosition(function (position) {
        console.log(position.coords.latitude, position.coords.longitude);
    });

    const style = {
        marginTop: '130px'
    }

    return (
        <Fragment>

            <br />

            <h1>Opción #1 – Api Turismo (Geo Redis) </h1><br />
            <h3>Esta opción consistirá en desarrollar una api de puntos de intereses para turistas, deberá
contemplar las siguiente actividades:<br />
1. Deberá tener los siguientes grupos de interés:<br />
a. Cervecerías artesanales.<br />
b. Universidades.<br />
c. Farmacias.<br />
d. Centros de atención de emergencias.<br />
e. Supermercados.<br />
2. Deberá tener un cliente para agregar lugares a los grupos de interés.<br />
3. Deberá mostrar los lugares de cada grupo que estén dentro de un radio de 5 km, de la
ubicación del usuario.<br />
4. Deberá devolver la distancia entre la ubicación del usuario y uno de los puntos elegido
por el usuario de los mostrados en el punto anterior. </h3><br />

        </Fragment>

    )
}


export default Home;
