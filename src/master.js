
import Vue from 'vue';
import detail from './detail.vue';


var Master = Vue.component('master', {
  components: {
      detail
  },

  template: `
    <div id="app">
      <div class="personList" id="master">
        <ol>
          <li v-for="persona in personasList">
            <a @href.prevent="" v-on:click="selectPersona(persona)">
              {{ persona.Nombre }} {{ persona.Apellidos }}
            </a>
          </li>
        </ol>
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
    selectPersona:function(persona) {
      debugger;
      Vue.$emit('update',persona);
    
     },

     cargaListado(){
      let _this = this;
      $.ajax({

      url:"http://10.60.23.21:50940/api/Personas/",
        type : 'GET',
       
        // el tipo de información que se espera de respuesta
        dataType : 'json',
     
        // código a ejecutar si la petición es satisfactoria;
        // la respuesta es pasada como argumento a la función
        success : function(data){
          debugger;
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
      error: function(xhr, status){
        debugger;
      },
        // código a ejecutar sin importar si la petición falló o no
        complete : function(xhr, status) {
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
  },

  render: h=>h(Master)
})
