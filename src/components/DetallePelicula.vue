<template>
    <div>
        <h2 class="text-center my-4">Detalle de pelicula: {{pelialhijo.titulo}}</h2>

        <table class="table table-hover text-center mb-4">
            <thead>
                <tr> 
                    <th>Titulo</th>   
                    <th>Director</th>
                    <th>Genero</th>
                    <th>Nacionalidad</th>
                    <th>Duración</th>
                    <th>Fecha Estreno</th>
                    <th>Precio</th>
                    <th>Acción</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{{pelialhijo.titulo}}</td>
                    <td>{{pelialhijo.director}}</td>
                    <td>{{genero}}</td>
                    <td>{{nacionalidad}}</td>
                    <td>{{pelialhijo.duracion}}</td>
                    <td>{{pelialhijo.fechaEstreno}}</td>
                    <td>{{pelialhijo.precio}}€</td>
                    <td><button type="button" data-bs-toggle="modal" data-bs-target="#staticBackdrop" class="btn btn-danger btn-sm">Eliminar</button></td>
                </tr>
            </tbody>
        </table>

        <div class="d-flex justify-content-center mb-4">
            <iframe class="mb-4" width="560" height="315" :src="'https://www.youtube.com/embed/'+pelialhijo.youTube" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>

        <!-- Modal -->
        <div class="modal fade" backdrop="false" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="staticBackdropLabel">¿Deseas eliminar la pelicula?</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                Esta opción es irreversible
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                <button @click="peliEliminada()" type="button" class="btn btn-danger" data-bs-dismiss="modal">Eliminar</button>
            </div>
            </div>
        </div>
        </div>

    </div>
</template>

<script>
import ServicePeliculas from './../components/services/ServicePeliculas';

const service = new ServicePeliculas();

export default{
    name: "DetallePelicula",
    props: ["pelialhijo"],
    mounted(){
        service.getNombreGenero(this.idgenero).then(result=>{
            this.genero = result.nombre;
        });
        service.getNombreNacionalidad(this.idnacionalidad).then(result=>{
            this.genero = result.nombre;
            this.nacionalidad = result.nombre;
        });

    },
    data(){
        return {
            idgenero: this.pelialhijo.idGenero,
            idnacionalidad: this.pelialhijo.idNacionalidad,
            genero: "",
            nacionalidad: "",
            idpelicula: this.pelialhijo.idPelicula,
            eliminando: false
        }
    },
    methods: {
        peliEliminada(){
            service.eliminarPelicula(this.idpelicula).then(result=>{
                console.log(result);
                this.$emit("peliEliminada",true);
            })
        }
    }
}
</script>

