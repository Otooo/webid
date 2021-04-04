<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <card
            body-classes="table-responsive"
          >
            <template slot="header">
              <h4 class="card-title">Auction</h4>
            </template>

            <load-general :message="'Loading data...'" :loaded="loaded" />

            <div v-if="loaded" class="container-fluid mb-3">
              <form @submit.prevent="update">
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
                      :value="auction.start_bid"
                      :disabled="true"
                      required
                    ></money>
                  </div>
          
                  <!-- CLOSED_AT -->
                  <div class="col-md-4 form-group">
                    <base-input
                      type="text"
                      label="Close at"
                      :disabled="true"
                      :value="auction.close_at_formatted"
                    ></base-input>
                  </div>
                </div>

                <!-- CURRENT BID && PAYER -->
                <div class="row">
                  <!-- PAYER -->
                  <div class="col-md-4">
                    <base-input
                      type="text"
                      label="Last Bidder"
                      :disabled="true"
                      :value="bidder"
                    ></base-input>
                  </div>
          
                  <!-- CURRENT BID -->
                  <div class="col-md-4 form-group">
                    <label>Current Bid</label>
                    <money
                      class="form-control border-input"
                      placeholder="Current bid"
                      v-bind="money"
                      :value="current_bid"
                      :disabled="true"
                      required
                    ></money>
                  </div>

                  <!-- YOUR ANOTHER BID -->
                  <div v-if="isRegular && !isClose" class="col-md-4 form-group">
                    <label>Offer</label>
                    <money
                      class="form-control border-input"
                      placeholder="Current bid"
                      v-bind="money"
                      v-model="offer"
                      required
                    ></money>
                  </div>
                </div>
          
                <div class="text-center" v-if="!isClose">
                  <!-- regular  -->
                  <div v-if="isRegular">
                    <button type="submit" class="btn btn-success btn-fill float-right">
                      <span v-show="loading_action">
                        <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        Bidding ...
                      </span>
                      <span v-show="!loading_action" :disabled="!loading_action">Bid</span>
                    </button>

                    <a class="btn btn-info btn-fill float-right mr-3" @click="activateBot">
                      <span v-show="loading_bot">
                        <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        Activating ...
                      </span>
                      <span v-show="!loading_bot" :disabled="!loading_bot">Activate BidBot</span>
                    </a>
                  </div>

                  <!-- admin -->
                  <div v-else>
                    <button type="submit" class="btn btn-danger btn-fill float-right">
                      <span v-show="loading_action">
                        <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        Closing ...
                      </span>
                      <span v-show="!loading_action" :disabled="!loading_action">Close Auction</span>
                    </button>
                  </div>
                </div>
                <div class="clearfix"/>
              </form>
            </div>

          </card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LoadGeneral from '@/components/Loadings/LoadGeneral.vue'
import Vue from "vue";
import { Money } from "v-money";
Vue.use(Money);
import auctionAPI from "@/api/auction.js";
import bidbotAPI from "@/api/bidbot.js";

export default {
  components: {
    LoadGeneral,
    Money
  },
  data() {
    return {
      id: '',
      loaded: true,
      loading_action: false,
      loading_bot: false,
      offer: 0,
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
        closed_at: '',
      }
    }
  },

  created() {
    this.id = this.$route.query.id;
    this.loadResources();
  },

  methods: {
    loadResources() {
      this.loadAuction()
      .then(this.handleAuctionData)
      .then(this.setAuctionData)
      .catch(this.$helpers.notifyVueError.bind(this))
      .finally(() => this.loaded = true);
    },

    loadAuction() {
      this.loaded = false;
      
      return auctionAPI.show(this.id)
    },
    
    handleAuctionData(response) {
      return new Promise((resolve, reject) => {
        response.close_at_formatted = this.$helpers.formatDate(response.close_at);

        resolve(response);
      });
    },

    setAuctionData(response) {
      this.auction = response;
      
      return this.auction;
    },

    update() {
      if (this.isAdmin)
        this.closeAuction()
      else
        this.bid();
    },

    bid() {
      this.loading_action = true;

      auctionAPI.update(this.auction._id, { isbid: true, current_bid: this.offer})
      .then(response => {
        this.$helpers.notifyVueSuccess.bind(this)(
          response.message
        ) 
        
        this.loadResources();
      })
      .catch(this.$helpers.notifyVueError.bind(this))
      .finally(() => (this.loading_action = false));
    },

    closeAuction() {
      this.loading_action = true;

      auctionAPI.update(this.auction._id, {status: 'closed'})
      .then(response => {
        this.$helpers.notifyVueSuccess.bind(this)(
          response.message
        ) 
        
        this.$router.push({ name: 'auctions'});
      })
      .catch(this.$helpers.notifyVueError.bind(this))
      .finally(() => (this.loading_action = false));
    },

    activateBot() {
      this.loading_bot = true;

      bidbotAPI
        .update({ active: true })
        .then((response) => {
          this.$helpers.notifyVueSuccess.bind(this)(response.message);
        })
        .catch(this.$helpers.notifyVueError.bind(this))
        .finally(() => (this.loading_bot = false));
    },
  },

  computed: {
    bidder() {
      if (this.auction.payer && this.auction.payer.name)
        return this.auction.payer.name;
      
        return '-';
    },

    current_bid() {
      if (this.auction.current_bid)
        return this.auction.current_bid;
      
        return 0;
    },
    
    isClose() {
      return 'closed' === this.auction.status;
    },

    user() {
      let user = JSON.parse(localStorage.getItem('user'));
      user = user? user: {id:0, name:'guest', roles:['ROLE_REGULAR']};
      
      return user;
    },
    isAdmin() {
      return this.user.roles.includes('ROLE_ADMIN');
    },
    isRegular() {
      return this.user.roles.includes('ROLE_REGULAR');
    }
  },
}
</script>
