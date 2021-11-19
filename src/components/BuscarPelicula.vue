<template>
    <div class="container">

        <div v-if="buscado">
            <h1 class="text-center mb-4">Resultado de busqueda: {{nomPeli}}</h1>

            <table class="table table-hover text-center">
                <thead>
                    <tr> 
                        <th>Titulo</th>   
                        <th>Director</th>
                        <th>Duración</th>
                        <th>Fecha Estreno</th>
                        <th>Precio</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="!encontrado">
                        <td colspan="6">
                            <div class="spinner-border" role="status">
                                <span class="visually-hidden">Buscando...</span>
                            </div>
                        </td>
                    </tr>
                    <tr v-else-if="pelis.length > 0" v-for="(peli,index) in pelis" :key="index" >
                        <td>{{peli.titulo}}</td>
                        <td>{{peli.director}}</td>
                        <td>{{peli.duracion}}</td>
                        <td>{{peli.fechaEstreno}}</td>
                        <td>{{peli.precio}}€</td>
                    </tr>
                    <tr v-else>
                        <td colspan="6">Pelicula no encontrada</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div v-else>
            <h1 class="text-center">Introduce un nombre para buscar una peli</h1>
        </div>


    </div>
</template>

<script>
import ServicePeliculas from './../components/services/ServicePeliculas';

const service = new ServicePeliculas();

export default{
    name: "BuscarPelicula",
    data(){
        return {
            nomPeli: "",
            pelis: [],
            buscado: false,
            encontrado: false
        }
    },
    mounted(){
        this.nombrePelicula();
    },
    watch: {
        '$route.params.nombre'(nextVal, prevVal){
            if (nextVal != prevVal){
                this.nombrePelicula();
            }
        }
    },
    methods: {
        nombrePelicula(){
            if(this.$route.params.nombre == null){
            this.buscado = false;
            this.encontrado = false;
            }else{
                //Guardamos el parametro en la variable
                this.nomPeli = this.$route.params.nombre;
                this.buscado = true;
                service.getPeliculaBuscada(this.nomPeli).then(result=>{
                this.encontrado = true;
                this.pelis = result;
            })
            }
        }
    }
}
</script>
