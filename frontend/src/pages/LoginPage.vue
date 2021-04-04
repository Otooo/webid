<template>
  <card>
    <h3 
      slot="header" 
      class="text-center card-title font-weight-bold"
    >
      Webid
    </h3>

    <form>
      <div class="row">
        <div class="col-md-12">
          <base-input 
            v-model="user.name"
            type="text"
            label="Name"
            placeholder="Name (admin, user1, user2)"/>
        </div>
      </div>

      <div class="row">
        <div class="col-md-12">
          <base-input v-slot="addonRight"
            label="Paswword"
          >
            <div class="input-group">
              <input id="password" v-model="user.password" type="password" class="form-control" placeholder="Paswword" aria-describedby="password">
              <div class="clickable input-group-text" @click="togglePasswordVisibility">
                <i :class="{'fa fa-eye': !show_password, 'fa fa-eye-slash': show_password}" aria-hidden="true"></i>
              </div>
          </div>
          </base-input>
        </div>
      </div>

      <div class="text-right">
        <button 
          type="submit" 
          class="btn btn-info btn-fill float-right" 
          :disabled="loading_login"
          @click.prevent="login"
        >
          <span v-show="loading_login">
            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            Connecting ...
          </span>
          <span v-show="!loading_login">Log in</span>
        </button>
      </div>

      <div class="clearfix"/>
    </form>
  </card>
</template>

<script>
import Card from '@/components/Cards/Card.vue';
import accessAPI from "@/api/access.js";

export default {
  components: {
    Card
  },
  data () {
    return {
      loading_login: false,
      show_password: false,
      user: {
        name: '',
        password: ''
      }
    };
  },
  methods: {
    login() {
      this.loading_login = true;

      accessAPI.login({name: this.user.name, password: this.user.password})
      .then(this.profile)
      .then(() => {
        this.$helpers.notifyVueSuccess.bind(this)('Welcome to Webid');
        setTimeout(() => {
          this.$router.push({ name: 'auctions'});
          this.loading_login = true;
        }, 500); 
      })
      .catch((error) => {
        try {
          this.$helpers.notifyVueError.bind(this)(error.response.data.error);
        } catch (errx) {
          this.$helpers.notifyVueError.bind(this)(error);
        }
      })
      .finally(() => this.loading_login = false);
    },

    profile(response) {
      const {
        accesstoken,
        expiresin
      } = response.headers;
      
      let expire = Date.now();
      // Plus expire time with current date
      expire = expire + Number(expiresin) * 1000;
      localStorage.setItem('expiration', expire);
      localStorage.setItem('token', accesstoken);

      const user = response.data;
      console.log('user', user);
      localStorage.setItem('user', JSON.stringify(user));
    },

    togglePasswordVisibility() {
      this.show_password = !this.show_password;
      document.getElementById('password').type = this.show_password? 'text' : 'password';
    }
  }
};
</script>

<style scoped>
  .card {
    width: 60%;
    margin: 0 auto;
    margin-top: 100px;
  }
</style>
