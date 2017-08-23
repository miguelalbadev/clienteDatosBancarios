<template>
  <div v-if="persona" id="detail">
    <legend>Datos Personales</legend>
    <div class="form-group">
      <label>Nombre: </label>
      <input type="text" v-model="persona.Nombre" />
    </div>
    <div class="form-group">
      <label>Apellidos: </label>
      <input type="text" v-model="persona.Apellidos" />
    </div>
    <div class="form-group">
      <label>Edad: </label>
      <input type="number" v-model="persona.Edad" />
    </div>
    <div class="form-group">
      <label>Genero: </label>
      <input type="radio" value="true" v-model="persona.Genero" />
      <input type="radio" value="false" v-model="persona.Genero" />
    </div>

    <div class="form-group">
      <button v-if="persona.Id" v-on:click="update">Actualizar</button>
      <button v-else v-on:click="create">Crear</button>
    </div>
  </div>
</template>

<script>
export default {
    name: 'detail',

    data() {
      return { persona: null };
    },

    created() {
      let _this = this;
      Vue.$on('update', (persona) => {
        _this.persona = persona;
      });
      Vue.$on('create', () => {
        _this.persona = { Name:'', Apellidos:'', Edad: 0, Genero: true };
      });
    },

    methods: {
      update() {
        this.$emit('update', this.persona);
        this.persona = null;
      },

      create() {
        this.$emit('create', this.persona);
        this.persona= null;
      },
    },
};
</script>

<style>
</style>
