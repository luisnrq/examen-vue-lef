import Global from './../Global';
import axios from 'axios';

export default class ServicePeliculas {

    getGeneros() {
        return new Promise(function (resolve) {
            var request = "/api/Generos";
            var url = Global.urlpeliculas + request;

            axios.get(url).then(res => {
                var generos = res.data;
                resolve(generos);
            })
        });
    }

    getNacionalidades() {
        return new Promise(function (resolve) {
            var request = "/api/Nacionalidades";
            var url = Global.urlpeliculas + request;

            axios.get(url).then(res => {
                var nacionalidades = res.data;
                resolve(nacionalidades);
            })
        });
    }

    getPeliculasGenero(genero){
        return new Promise(function (resolve) {
            var request = "/api/Peliculas/PeliculasGenero/" + genero;
            var url = Global.urlpeliculas + request;

            axios.get(url).then(res => {
                var pelis = res.data;
                resolve(pelis);
            })
        });
    }

    getPeliculasNacionalidad(nacionalidad){
        return new Promise(function (resolve) {
            var request = "/api/Peliculas/PeliculasNacionalidad/" + nacionalidad;
            var url = Global.urlpeliculas + request;

            axios.get(url).then(res => {
                var pelis = res.data;
                resolve(pelis);
            })
        });
    }

    getNombreGenero(idgenero){
        return new Promise(function (resolve) {
            var request = "/api/Generos/" + idgenero;
            var url = Global.urlpeliculas + request;

            axios.get(url).then(res => {
                var genero = res.data;
                resolve(genero);
            })
        });
    }

    getNombreNacionalidad(idnacionalidad){
        return new Promise(function (resolve) {
            var request = "/api/Nacionalidades/" + idnacionalidad;
            var url = Global.urlpeliculas + request;

            axios.get(url).then(res => {
                var nacionalidad = res.data;
                resolve(nacionalidad);
            })
        });
    }

    eliminarPelicula(idPelicula){
        return new Promise(function(resolve){
            var request = "/api/Peliculas/" + idPelicula;
            var url = Global.urlpeliculas + request;

            axios.delete(url).then(res=>{
                resolve(res);
            })
        });
    }

    getPeliculaBuscada(nombre){
        return new Promise(function (resolve) {
            var request = "/api/Peliculas/BuscadorPeliculas/" + nombre;
            var url = Global.urlpeliculas + request;

            axios.get(url).then(res => {
                var pelis = res.data;
                resolve(pelis);
            })
        });
    }


}