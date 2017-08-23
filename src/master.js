import Vue from 'vue';
import detail from './detail.vue';


Vue.component('master', {
  components: {
      detail
  },

  template: `
    <div id="app">
      <div id="master">
        <li v-for="persona in personasList">
          <a @href.prevent="" v-on:click="selectPersona(persona.Id)">
            {{ persona.Nombre }} {{ persona.Apellidos }} 
          </a>
        </li>
      </div>

      <detail></detail>
    </div>
    `,

  data() {
    return {
      personasList: [],
      personaSelected: null
    };
  },

  mounted() {
    this.cargaListado();
  },

  methods: {
    selectPersona(id) {
      debugger;
      
      $.ajax({

        url: "http://192.168.1.38:50940/api/Personas/" + id,
        type: 'GET',

        // el tipo de información que se espera de respuesta
        dataType: 'json',

        // código a ejecutar si la petición es satisfactoria;
        // la respuesta es pasada como argumento a la función
        success: function(data){
          debugger;
          for(i=0;i<data.length;i++){
            var persona = {};
              persona.Id = data[i].Id;
              persona.Nombre = data[i].Nombre;
              persona.Apellidos = data[i].Apellidos;
              persona.Edad = data[i].Edad;
              persona.Genero = data[i].Genero;
              app.$children[0].personasList.push(persona);
              
          }
        },
        error: function(xhr, status) {
          debugger;
        },
        // código a ejecutar sin importar si la petición falló o no
        complete: function(xhr, status) {
          //alert('Petición realizada');
        }
      });
    },

    cargaListado() {
      $.ajax({
        url: "http://192.168.1.38:50940/api/Personas/",
        type: 'GET',

        // el tipo de información que se espera de respuesta
        dataType: 'json',

        // código a ejecutar si la petición es satisfactoria;
        // la respuesta es pasada como argumento a la función
        success: function(data) {
          debugger;
          var i = 0;
          for (i = 0; i < data.length; i++) {
            var persona = {};
            persona.Id = data[i].Id;
            persona.Nombre = data[i].Nombre;
            persona.Apellidos = data[i].Apellidos;
            persona.Edad = data[i].Edad;
            app.$children[0].personasList.push(persona);
            
          }

        },
        error: function(xhr, status) {
          debugger;
        },
        // código a ejecutar sin importar si la petición falló o no
        complete: function(xhr, status) {
          //alert('Petición realizada');
        }
      });
    }
  }
})

var app = new Vue({
  el: '#app',
  created(){
    window.Vue = this;
  }
})
