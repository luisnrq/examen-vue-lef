<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light mb-4">
  <div class="container">
    <router-link to="/" class="navbar-brand">
            <img src="./../assets/logo.png" alt="logo" width="70" height="50">
    </router-link>

    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <router-link to="/" class="nav-link" >Home</router-link>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Generos
          </a>
          <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
            <li v-for="(genero,index) in generos" :key="index">
                <router-link :to="'/peliculas/genero/' + genero.idGenero" class="dropdown-item" >{{genero.nombre}}</router-link>
            </li>
          </ul>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Nacionalidad
          </a>
          <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
            <li v-for="(nacion,index) in nacionalidades" :key="index">
                <router-link :to="'/peliculas/nacionalidad/' + nacion.idNacionalidad" class="dropdown-item" >{{nacion.nombre}} <img :src="nacion.bandera" class="float-end" alt="bandera" style="width: 20px;height:20px" /></router-link>
            </li>
          </ul>
        </li>
      </ul>
      
      <form class="d-flex">
        <input class="form-control me-2" type="search" placeholder="Buscar Pelicula..." aria-label="Search" v-model="nombrePelicula" />
        <router-link :to="'/buscarpelicula/' + nombrePelicula" class="btn btn-outline-success" type="submit">Buscar</router-link>
      </form>
    </div>
  </div>
</nav>
</template>

<script>
import ServicePeliculas from './../components/services/ServicePeliculas';

const service = new ServicePeliculas();

export default{
    name: "Menu",
    methods: {
        cargarGeneros(){
            service.getGeneros().then(result=>{
                this.generos = result;
            });
        },
        cargarNacionalidades(){
            service.getNacionalidades().then(result=>{
                this.nacionalidades = result;
            });
        }
    },
    data(){
        return {
            generos: [],
            nacionalidades: [],
            nombrePelicula: ""
        }
    },
    mounted(){
        this.cargarGeneros();
        this.cargarNacionalidades();
    }
    
}
</script>
