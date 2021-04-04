<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <card
            body-classes="table-responsive"
          >
            <template slot="header">
              <h4 class="card-title">Auctions</h4>
            </template>

            <div class="mb-5">
              <div class="row">
                <!-- ITEM NAME -->
                <div class="col-md-6">
                  <base-input 
                    v-model="form.name"
                    type="text"
                    label="Item name"
                    placeholder="Name"
                  />
                </div>
                
                <!-- ITEM DESCRIPTION -->
                <div class="col-md-6">
                  <base-input 
                    v-model="form.description"
                    type="text"
                    label="Item description"
                    placeholder="Description"
                  />
                </div>
              </div>

              <div class="row">
                <div class="col-md text-right">
                  <button 
                    class="btn btn-primary btn-fill"
                    :disabled="!loaded"
                    @click="search()">Search</button>
                </div>
              </div>
              <hr>
            </div>

            <l-table 
              :columns="columns"
              :action-columns="['Actions']"
              :data="data"
              :loaded="loaded"
              class="table-hover table-striped break-word"
            >
              <template v-slot:actions="row">
                <td>
                  <a
                    v-tooltip="'See more'"
                    class="float-right btn btn-sm btn-icon-lg btn-info mh10"
                    @click="seeAuction(row.item._id)"
                    >
                    <!-- :href="`/auction/${row.item._id}`" -->
                    <i class="fa fas fa-eye" />
                  </a>
                  
                  <button
                    v-if="isAdmin"
                    v-tooltip="'Close auction'"
                    class="float-right btn btn-sm btn-icon-lg btn-danger"
                    :class="{'clickblock': 'opened' != row.item.status}"
                    @click="closeAuction(row.item)"
                    :disabled="'opened' != row.item.status"
                  >
                    <i v-if="'opened' != row.item.status" class="fa fa-hourglass-end" aria-hidden="true" style="color:red" />
                    <i v-else class="fa fas fa-close" />
                  </button>
                </td>
              </template>
            </l-table>
          </card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LTable from '@/components/Table';
import auctionAPI from "@/api/auction.js";

export default {
  components: {
    LTable
  },
  data() {
    return {
      form: {
        name: '',
        description: ''
      },
      columns: {
        // id: '#',
        item_name: "Product",
        payer_name: "Last Bidder",
        usd_bid: "Current Bid",
        closing: "Closing"
      },
      data: [],
      loaded: true,
      loading_close: false
    };
  },
  mounted() {
    this.loadResources();
  },
  methods: {
    loadResources() {
      this.loadAuctions()
      .then(this.handleAuctionsData)
      .then(this.setAuctionsData)
      .catch(this.$helpers.notifyVueError.bind(this))
      .finally(() => this.loaded = true);
    },

    loadAuctions() {
      this.loaded = false;
      
      return auctionAPI.index(this.form)
    },
    
    handleAuctionsData(response) {
      return new Promise((resolve, reject) => {
        response = response.map(res => {
          res.item_name = res.item.name;
          res.payer_name = res.payer? res.payer.name : ' - ';
          res.usd_bid = this.$helpers.formatPriceUSD(res.current_bid);
          res.closing = this.$helpers.formatDate(res.close_at);

          return res;
        })
        
        resolve(response);
      });
    },

    setAuctionsData(response) {
      this.data = response;
      return this.data;
    },

    search() {
      this.loadResources();
    }, 

    closeAuction(auction) {
      this.loading_close = true;

      auctionAPI.update(auction._id, {status: 'closed'})
      .then(response => {
        this.$helpers.notifyVueSuccess.bind(this)(
          response.message
        ) 
        
        this.search();
      })
      .catch(this.$helpers.notifyVueError.bind(this))
      .finally(() => (this.loading_close = false));
    },

    create() {
      this.$router.push({ name: 'service-type' });
    },

    seeAuction(id) {
      this.$router.push({name: 'auction-edit', query: { id }});
    }
  },

  computed: {
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
};
</script>

<style>
  .align-center {
    align-self: center;
  }

  .mh10 {
    margin: 0 10px;
  }
</style>
