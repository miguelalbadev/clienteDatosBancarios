import Vue from 'vue'


Vue.component('personas', {
  props: ['todo'],
  template: '<li><a @href.prevent="" v-on:click="selectPersona(todo.id)">{{ todo.nombre }} {{ todo.apellidos }} </a></li>',
  methods:{
  	selectPersona:function(id){
  		debugger;
  		app2.seen = true;
  		$.ajax({

		  url:"http://10.60.23.21:50940/api/Personas/"+id,
		    type : 'GET',

		    // el tipo de información que se espera de respuesta
		    dataType : 'json',
		 
		    // código a ejecutar si la petición es satisfactoria;
		    // la respuesta es pasada como argumento a la función
		    success : function(data){
		    	debugger;
		    	app2.Name = data.Nombre;
		    	app2.LastName = data.Apellidos;
		    	app2.Age = data.Edad;
		    	app2.Id = data.Id;
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
  data: {
    personasList: []
  },
  mounted:function(){
  	this.cargaListado();
  },
  methods:{
  	cargaListado(){
  		$.ajax({

		  url:"http://10.60.23.21:50940/api/Personas/",
		    type : 'GET',

		    // el tipo de información que se espera de respuesta
		    dataType : 'json',
		 
		    // código a ejecutar si la petición es satisfactoria;
		    // la respuesta es pasada como argumento a la función
		    success : function(data){
		    	debugger;
		    	for(i=0;i<data.length;i++){
		    		var persona = {};
		        	persona.id = data[i].Id;
		        	persona.nombre = data[i].Nombre;
		        	persona.apellidos = data[i].Apellidos;
		        	persona.edad = data[i].Edad;
		        	app.personasList.push(persona);
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
