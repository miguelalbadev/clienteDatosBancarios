import Vue from 'vue';
import detail from './detail.vue';


var Master = Vue.component('master', {
  components: {
    detail
  },

  template: `
    <div id="app">
      <div class="personList" id="master">
        <button v-on:click="">Crear nuevo</button>
        <ol>
          <li v-for="persona in personasList">
            <a @href.prevent="" v-on:click="selectPersona(persona)">
              {{ persona.Nombre }} {{ persona.Apellidos }}
            </a>
            <button v-on:click="removePersona(persona)">Eliminar</button>
          </li>
        </ol>
      </div>

      <detail v-on:update="updatePersona" v-on:create="createPersona" ></detail>
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

    /* HANDLE EVENTS */

    selectPersona: function(persona) {
      app.$emit('update', persona);
    },

    createNewPersona: function() {
      app.$emit('create');
    },

    removePersona: function(persona) {
      // TODO CALL TO DELETE PERSONA REQUEST
      let index = this.personasList.indexOf(persona);
      this.personasList.splice(index, 1);
    },

    /* HANDLE DETAILS EVENTS */

    updatePersona: function(persona) {
      // TODO CALL TO UPDATE PERSONA REQUEST
      let index = 0;
      let _this = this;

      this.personasList.forEach((p) => {
        if (p.Id == persona.Id) {
          index = _this.personasList.indexOf(p);
        }
      });
      this.personasList[index] = persona;
    },

    createPersona: function(persona) {
      // TODO CALL TO CREATE PERSONA REQUEST
      this.personasList.push(persona);
    },

    /* AJAX REQUESTS */

    cargaListado() {
      let _this = this;
      $.ajax({

        url: "http://10.60.23.21:50940/api/Personas/",
        type: 'GET',

        // el tipo de información que se espera de respuesta
        dataType: 'json',

        // código a ejecutar si la petición es satisfactoria;
        // la respuesta es pasada como argumento a la función
        success: function(data) {
          // debugger;
          var i = 0;


          for (i = 0; i < data.length; i++) {
            var persona = {};
            persona.Id = data[i].Id;
            persona.Nombre = data[i].Nombre;
            persona.Apellidos = data[i].Apellidos;
            persona.Edad = data[i].Edad;

            _this.personasList.push(persona);

          }

        },
        error: function(xhr, status) {
          // debugger;
        },
        // código a ejecutar sin importar si la petición falló o no
        complete: function(xhr, status) {
          //alert('Petición realizada');
        }
      });
    },

    crearPersona(persona) {
      $.ajax({

        url: "http://10.60.23.21:50940/api/Personas/",
        type: 'POST',

        // el tipo de información que se espera de respuesta
        dataType: 'json',

        data: {
          Nombre: persona.Nombre,
          Apellidos: persona.Apellidos,
          Edad: persona.Apellidos,
          Genero: persona.Genero
        },

        // código a ejecutar si la petición es satisfactoria;
        // la respuesta es pasada como argumento a la función
        success: function(data) {
          debugger;
          alert('La función POST funcionó correctamente');
          _this.personasList.push(persona);
        },
        error: function(xhr, status) {
          debugger;
          alert('Disculpe, existió un problema con la función POST');
        },
        // código a ejecutar sin importar si la petición falló o no
        complete: function(xhr, status) {
          //alert('Petición realizada');
        }
      });


    },

    eliminarPersona(persona) {
      $.ajax({

        url: "http://10.60.23.21:50940/api/Personas/" + persona.Id,
        type: 'DELETE',

        // el tipo de información que se espera de respuesta
        dataType: 'json',


        // código a ejecutar si la petición es satisfactoria;
        // la respuesta es pasada como argumento a la función
        success: function(data) {
          debugger;
          alert('La función DELETE funcionó correctamente');
          _this.personasList.splice(_this.personasList.indexOf(persona));
        },
        error: function(xhr, status) {
          debugger;
          alert('Disculpe, existió un problema con la función POST');
        },
        // código a ejecutar sin importar si la petición falló o no
        complete: function(xhr, status) {
          //alert('Petición realizada');
        }
      });
    },

    actualizarPersona(persona) {

      $.ajax({

        url: "http://10.60.23.21:50940/api/Personas/" + persona.Id,
        type: 'PUT',

        // el tipo de información que se espera de respuesta
        dataType: 'json',

        data: {
          Nombre: persona.Nombre,
          Apellidos: persona.Apellidos,
          Edad: persona.Apellidos,
          Genero: persona.Genero
        },
        // código a ejecutar si la petición es satisfactoria;
        // la respuesta es pasada como argumento a la función
        success: function(data) {
          debugger;
          alert('La función PUT funcionó correctamente');
          _this.personasList.splice(_this.personasList.indexOf(persona));
        },
        error: function(xhr, status) {
          debugger;
          alert('Disculpe, existió un problema con la función POST');
        },
        // código a ejecutar sin importar si la petición falló o no
        complete: function(xhr, status) {
          //alert('Petición realizada');
        }
      });
    }


  }
});

var app = new Vue({
  el: '#app',
  created() {
    window.Vue = this;
  },

  render: h => h(Master)
})
