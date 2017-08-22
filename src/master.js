import Vue from 'vue'


Vue.component('Master', {
  template: `
    <div id="app">
      <div id="master">
        <li v-for="persona in personasList">
          <a @href.prevent="" v-on:click="selectPersona(todo.id)">
            {{ persona.Nombre }} {{ todo.Apellidos }}
          </a>
        </li>
      </div>

      <detail></detail>
    </div>
    `,

  data: {
      personas: [],
      persona_selected: null
  },

  mounted() {
    this.cargaListado();
  },

  methods: {
    selectPersona(id) {
      debugger;
      app2.seen = true;
      $.ajax({

        url: "http://10.60.23.21:50940/api/Personas/" + id,
        type: 'GET',

        // el tipo de información que se espera de respuesta
        dataType: 'json',

        // código a ejecutar si la petición es satisfactoria;
        // la respuesta es pasada como argumento a la función
        success: (data) => {
          debugger;
          app2.Name = data.Nombre;
          app2.LastName = data.Apellidos;
          app2.Age = data.Edad;
          app2.Id = data.Id;
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

        url: "http://10.60.23.21:50940/api/Personas/",
        type: 'GET',

        // el tipo de información que se espera de respuesta
        dataType: 'json',

        // código a ejecutar si la petición es satisfactoria;
        // la respuesta es pasada como argumento a la función
        success: function(data) {
          debugger;
          for (i = 0; i < data.length; i++) {
            var persona = {};
            persona.id = data[i].Id;
            persona.nombre = data[i].Nombre;
            persona.apellidos = data[i].Apellidos;
            persona.edad = data[i].Edad;
            app.personasList.push(persona);
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
  created: {
    window.Vue = this;
  }
})
