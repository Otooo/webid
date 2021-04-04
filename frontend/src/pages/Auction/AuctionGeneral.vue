<template>
  <div class="container-fluid mb-3">
    <form @submit.prevent="create">
      <!-- IMG && DESCRIPTION-->
      <div class="row">
        <!-- IMG -->
        <div class="col-md-6 no-click">
          <a href="#">
          <img 
            class="item-image"
            :src="404" 
            @error="(event) => {event.target.src = '/img/no-image.jpg'}"
            alt="Product image"
          >
          <h4 class="title">
            {{ auction.item.name }}
          </h4>
          </a>
        </div>

          <!-- DESCRIPTION -->
          <div class="col-md-6">
            <div class="form-group">
              <label>Product Description</label>
              <textarea
                rows="5"
                class="form-control border-input"
                placeholder="Product description"
                :value="auction.item.description"
                :disabled="true"
              ></textarea>
            </div>
          </div>
      </div>

      <!-- STATUS && START_BID && CLOSED_AT -->
      <div class="row">
        <!-- STATUS -->
        <div class="col-md-4">
          <base-input
            type="text"
            label="Status"
            :disabled="true"
            :value="auction.status"
          ></base-input>
        </div>

        <!-- START_BID -->
        <div class="col-md-4 form-group">
          <label>Starting bid</label>
          <money
            class="form-control border-input"
            placeholder="Initial bid"
            v-bind="money"
            v-model="auction.start_bid"
            required
          ></money>
        </div>

        <!-- CLOSED_AT -->
        <div class="col-md-4 form-group">
          <label>Close at</label>
          <input 
            type="datetime-local" 
            class="form-control border-input"
            placeholder="Date to finish auction"
            v-model="auction.closed_at"
            required
          />
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
import Vue from "vue";
import { Money } from "v-money";
Vue.use(Money);
import auctionAPI from "@/api/auction.js";

export default {
  components: {
    Money
  },
  data() {
    return {
      loading_save: false,
      isSee: false,
      money: {
        decimal: ".",
        thousands: ",",
        prefix: "$ ",
        precision: 2,
        masked: false
      },
      auction: {
        item: {
          name: '',
          image: '',
          description: '',
        },
        status: 'closed',
        start_bid: 0,
        closed_at: Date.now(),
      }
    };
  },
  
  mounted() {
    if (! this.$route.params.item)
    this.$router.push('/products');
    
    if (! this.$route.params.auction) {
      this.isSee = true;
      this.auction = JSON.parse(this.$route.params.auction);
    } 
    
    this.auction.item = JSON.parse(this.$route.params.item);
  },
  methods: {
    create() {
      this.loading_save = true;
      
      console.log('aution', this.auction);

      const datapost = { 
        item: this.auction.item._id, 
        start_bid: this.auction.start_bid, 
        closed_at: this.auction.closed_at 
      };

      auctionAPI
        .store(datapost)
        .then(() => {
          this.$helpers.notifyVueSuccess.bind(this)('Auction successfully created!');
          
          // this.$router.push('/products'); // Go to edit auction
        })
        .catch(this.$helpers.notifyVueError.bind(this))
        .finally(() => (this.loading_save = false));
    }
  }
};
</script>

<style scoped>
  .item-image {
    height: 200px;
    width: 200px;
  }
  .no-click {
    pointer-events: none;
  }
</style>
