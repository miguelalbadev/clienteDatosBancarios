Vue.component({
  template:
    `
      <div id="detail" v-if="user">
        <legend>Datos Personales</legend>
        <div class="form-group">
          <label>Nombre: </label>
          <input type="text" v-model="user.Nombre"/>
        </div>
        <div class="form-group">
          <label>Apellidos: </label>
          <input type="text" v-model="user.Apellidos"/>
        </div>
        <div class="form-group">
          <label>Edad: </label>
          <input type="number" v-model="user.Edad"/>
        </div>
        <div class="form-group">
          <label>Genero: </label>
          <input type="radio" value="true" v-model="user.Genero"/>
          <input type="radio" value="false" v-model="user.Genero"/>
        </div>

        <div class="form-group">
          <button v-if="user.Id" v-on:click="update" >Actualizar</button>
          <button v-else v-on:click="create">Crear</button>
        </div>
      </div>

    `,

    data: {
      user: null,
    },

    created() {
      let _this = this;
      Vue.$on('update', (user) => {
        _this.user = user;
      });
      Vue.$on('create', () => {
        _this.user = {Name:'', Apellidos:'', Edad: 0, Genero: true};
      });
    },

    methods: {
      update() {
        this.$emit('update', this.user);
        this.user = null;
      },

      create() {
        this.$emit('create', this.user);
        this.user= null;
      },
    },
})
