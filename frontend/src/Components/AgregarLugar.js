import React, { Fragment, useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'

export default function AgregarLugar() {

    const [grupo, setGrupo] = useState('')
    const [nombre, setNombre] = useState('')
    const [latitud, setLatitud] = useState(0)
    const [longitud, setLongitud] = useState(0)

    const agregarLugar = e => {
        e.preventDefault()
        console.log(grupo)
        console.log(nombre)
        console.log(latitud)
        axios({
            "method": "POST",
            "url": "http://localhost:5000//agregarLugarGrupoInteres",
            "params": {
                "grupo": grupo,
                "latitud": latitud,
                "longitud": longitud,
                "nombre": nombre,
            }

        }).then((response) => {
            console.log(response);
            Swal.fire({
                //title: 'Lugar agregado!',
                text: 'El lugar ha sido agregado.',

            }).then((result) => {
                if (result.value) {
                    let link = '/agregar'
                    window.location.href = link
                }
            })
        })
            .catch((error) => {
                console.log(error);
                Swal.fire({
                    title: "Ha ocurrido un error!",
                    text: "Verifique que los datos ingresados sean correctos",
                    icon: "error",
                });
            });
    }

    return (
        <Fragment>

            <br />
            <br />
            <div align="center">

                <form className="col-sm-4" onSubmit={agregarLugar}>

                    <div class="form-group">

                        <input type="text" autoFocus class="form-control" required placeholder="Ingrese el nombre del lugar"
                            onChange={e => setNombre(e.target.value)} />

                    </div>
                    < br />
                    <div class="form-group">

                        {/*<label for="exampleFormControlSelect1">Seleccionar al grupo que pertenece</label>*/}
                        <select class="form-control" id="exampleFormControlSelect1" onChange={e => setGrupo(e.target.value)} >
                            <option value="" disabled selected hidden>Seleccionar al grupo que pertenece</option>
                            <option value="CentrosEmergencias">Centros de Emergencia</option>
                            <option value="Farmacias">Farmacias</option>
                            <option value="Universidades">Universidades</option>
                            <option value="Supermercados">Supermercados</option>
                            <option value="Cervecerias">Cervecerías</option> {/*selected*/}
                        </select>
                    </div>

                    <div class="form-group">
                        <br />

                        <input class="form-control" required placeholder="Ingrese la latitud ej: -32.4824905"
                            onChange={e => setLatitud(e.target.value)} />

                    </div>

                    <div class="form-group">
                        <br />

                        <input class="form-control" required placeholder="Ingrese la longitud ej: -58.2372208"
                            onChange={e => setLongitud(e.target.value)} />
                    </div>

                    <button type="submit" class="btn btn-success">Agregar Lugar</button>
                </form>
            </div>
        </Fragment>
    )

}