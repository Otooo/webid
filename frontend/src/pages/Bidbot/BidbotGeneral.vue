<template>
  <div class="container-fluid mb-3">
    <load-general :message="'Loading data...'" :loaded="loaded" />
    
    <form v-if="loaded" @submit.prevent="save">

      <div class="row" :class="{disabled:isDisabled, enabled:!isDisabled}">
        <div class="col-md">
          <h2>
            {{ status }}
          </h2>
        </div>
      </div>
      
      <br />
      <br />

      <!-- STATUS CURRENT / MAX BID -->
      <div class="row">
        <!-- MAX -->
        <div class="col-md-4 form-group">
          <label>Max bid</label>
          <money
            class="form-control border-input"
            placeholder="Max bid"
            v-bind="money"
            v-model="bidbot.max_bid"
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
            :value="bidbot.current_bid"
            :disabled="true"
          ></money>
        </div>
        
        <!-- ACTIVATE -->
        <div class="col-md-4 align-center">
          <base-checkbox v-model="bidbot.active">Enabled</base-checkbox>
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
    this.loadResources();
  },

  methods: {
    loadResources() {
      this.loaded = false;

      bidbotAPI.show()
      .then(this.setBidbotnData)
      .catch(this.$helpers.notifyVueError.bind(this))
      .finally(() => this.loaded = true);
    },

    setBidbotnData(response) {
      this.bidbot = response;
      
      return this.bidbot;
    },

    save() {
      this.loading_save = true;

      bidbotAPI
        .update(this.bidbot)
        .then((response) => {
          this.$helpers.notifyVueSuccess.bind(this)(response.message);
        })
        .catch(this.$helpers.notifyVueError.bind(this))
        .finally(() => (this.loading_save = false));
    }
  },

  computed: {
    isDisabled() {
      return !this.bidbot.active;
    },
    current_bid() {
      return this.$helpers.formatPriceUSD(this.bidbot.current_bid || 0);
    },
    max_bid() {
      return this.$helpers.formatPriceUSD(this.bidbot.max_bid || 0);
    },
    status() {
      return (this.isDisabled? 'Disabled':'Enabled') + '   ' + this.current_bid + ' / ' + this.max_bid;
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

  .enabled * {
    color: darkgreen;
    text-align: center !important;
  }
  .disabled * {
    color: darkred;
    text-align: center !important;
  }
</style>
