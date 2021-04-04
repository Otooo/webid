<template>
  <div class="container-fluid mb-3">
    <load-general :message="'Loading data...'" :loaded="loaded" />
    
    <form v-if="loaded" @submit.prevent="save">

      <div class="row">
        <div class="col-md">
          <base-input
            type="text"
            label=""
            :value="status"
            :class="[text-center, {'disabled':isDisabled, 'enabled':!isDisabled}]"
            :disabled="true"
          ></base-input>
        </div>
      </div>
      
      <br />
      <br />

      <!-- STATUS CURRENT / MAX BID -->
      <div class="row">
        <!-- START_BID -->
        <!-- <div class="col-md-4 form-group">
          <radio
            type="text"
            label="Status"
            v-model="bidbot.active"
          ></radio>
        </div> -->

        <!-- MAX -->
        <div class="col-md-4 form-group">
          <label>Max bid</label>
          <money
            class="form-control border-input"
            placeholder="Max bid"
            v-bind="money"
            :value="bidbot.max_bid"
            required
          ></money>
        </div>

        <!-- CURRENT -->
        <div class="col-md-4 form-group">
          <label>Current bid</label>
          <money
            class="form-control border-input"
            placeholder="Initial bid"
            v-bind="money"
            v-model="bidbot.current_bid"
            required
          ></money>
        </div>
      </div>

      <!-- EDIT BUTTON -->
      <div class="text-center">
        <button type="submit" class="btn btn-success btn-fill float-right">
          <span v-show="loading_save">
            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            Saving ...
          </span>
          <span v-show="!loading_save" :disabled="!loading_save">Save</span>
        </button>
      </div>
      <div class="clearfix"/>
    </form>
  </div>
</template>

<script>
import LoadGeneral from '@/components/Loadings/LoadGeneral.vue'
import Vue from "vue";
import { Money } from "v-money";
Vue.use(Money);
import bidbotAPI from "@/api/bidbot.js";

export default {
  components: {
    LoadGeneral,
    Money
  },
  data() {
    return {
      loaded: true,
      loading_save: false,
      money: {
        decimal: ".",
        thousands: ",",
        prefix: "$ ",
        precision: 2,
        masked: false
      },
      bidbot: {
        active: false,
        max_bid: '',
        current_bid: '',
      }
    };
  },
  
  created() {
    
  },

  methods: {
    save() {
      this.loading_save = true;

      bidbotAPI
        .store(this.bidbot)
        .then((response) =>{
          this.$helpers.notifyVueSuccess.bind(this)('Product successfully created!');
          this.$router.push('/products'); 
        })
        .catch(this.$helpers.notifyVueError.bind(this))
        .finally(() => (this.loading_save = false));
    },

    update() {
      this.$helpers.notifyVueWarning.bind(this)('Not yet...')
    }
  },

  computed: {
    isDisabled() {
      return false === this.bidbot.active;
    },
    current_bid() {
      return this.bidbot.current_bid;
    },
    max_bid() {
      return this.bidbot.max_bid;
    },
    status() {
      return (this.isDisabled? 'Enabled':'Activated') + '   ' + this.current_bid + '/' + this.max_bid;
    }
  },
};
</script>

<style scoped>
  .bidbot-image {
    height: 200px;
    width: 200px;
  }
  .no-click {
    pointer-events: none;
  }

  .enabled {
    color: darkgreen;
    text-align: center;
  }
  .disabled {
    color: darkred;
    text-align: center;
  }
</style>
