<template>
    <div class="container">
        <h1 class="text-center mb-4">{{titulo}}</h1>

        <div v-if="mostrarMensajeEliminado">
            <div class="alert alert-warning alert-dismissible fade show" role="alert">
                <strong>!Eliminada!</strong> Pelicula eliminada con exito.
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        </div>

        <div v-if="mostrardetalle">
            <DetallePelicula :pelialhijo="pelidetalle" v-on:peliEliminada="peliEliminada" />
        </div>

        <div v-if="mostrar">
            <div class="row">
                <div class="col-12 col-md-6  col-lg-3" v-for="(peli,index) in peliculas" :key="index">
                    <div class="card mx-auto text-center mb-4" style="width: 18rem;">
                        <img :src="peli.foto" class="card-img-top" alt="imagen" style="height:300px">
                        <h5 class="card-title">{{peli.titulo}}</h5>
                        <div class="card-body">
                            <p class="card-text">{{peli.argumento}}</p>
                            <a class="btn btn-danger mx-1" :href="peli.enlaceVideo" target="_blank">YouTube</a>
                            <button @click="mostrarDetallePelicula(peli)" class="btn btn-outline-danger mx-1">Detalles</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>

        <div v-else class="d-flex justify-content-center mb-4">
            <div class="spinner-border" role="status">
                <span class="visually-hidden">Cargando...</span>
            </div>
        </div>

    </div>
</template>

<script>
import ServicePeliculas from './../components/services/ServicePeliculas';
import DetallePelicula from './DetallePelicula.vue';

const service = new ServicePeliculas();

export default{
    name: "Peliculas",
    components: {
        DetallePelicula
    },
    mounted(){
        this.mostrarDatos();
    },
    methods:{
        mostrarDatos(){
            this.mostrardetalle = false;
            if(this.$route.params.idgenero){
            this.genero = this.$route.params.idgenero;
            this.titulo = "Peliculas Por genero";
            this.buscarPelisGenero(this.genero);
            }else{
                this.titulo = "Peliculas Por Nacionalidad";
                this.nacionalidad = this.$route.params.idnacionalidad;
                this.buscarPelisNacionalidad(this.nacionalidad);
            }
        },
        buscarPelisGenero(genero){
            this.mostrardetalle = false;
            this.mostrar = false;
            service.getPeliculasGenero(genero).then(result=>{
                this.peliculas = result;
                this.mostrar = true;
                //console.log(this.peliculas);
            });
        },
        buscarPelisNacionalidad(nacionalidad){
            this.mostrardetalle = false;
            this.mostrar = false;
            //console.log(nacionalidad);
            service.getPeliculasNacionalidad(nacionalidad).then(result=>{
                this.peliculas = result;
                this.mostrar = true;
                //console.log(this.peliculas);
            });
        },
        mostrarDetallePelicula(peli){
            this.mostrardetalle = true;
            this.pelidetalle = peli;
        },
        peliEliminada(valor){
            if(valor){
                this.mostrardetalle = false;
                this.mostrarMensajeEliminado = true;
                this.mostrarDatos();
            }
        }
    },
    data(){
        return {
            genero: "",
            nacionalidad: "",
            titulo: "",
            peliculas: [],
            mostrar: false,
            mostrardetalle: false,
            pelidetalle: {},
            mostrarMensajeEliminado: false
        }
    },
    watch: {
        '$route.params.idgenero'(nextVal, prevVal){
            if (nextVal != prevVal){
                this.mostrarDatos();
            }
        },
        '$route.params.idnacionalidad'(nextVal, prevVal){
            if (nextVal != prevVal){
                this.mostrarDatos();
            }
        }
    }
}
</script>
