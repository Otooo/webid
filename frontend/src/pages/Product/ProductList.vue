<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <card
            body-classes="table-responsive"
          >
            <template slot="header">
              <h4 class="card-title">Products</h4>
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
                <div class="col-md text-left">
                  <button 
                    class="btn btn-warning btn-fill"
                    :disabled="!loaded"
                    @click="create()"
                  >
                    Create
                  </button>
                </div>
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
                  <!-- <router-link
                    v-tooltip="'See more'"
                    :to="{name: 'product', params: {product:`${JSON.stringify(row.item)}`} }"
                    class="float-right btn btn-sm btn-icon-lg btn-info mh10"
                  >
                    <i class="fa fas fa-eye" />
                  </router-link> -->
                
                  <router-link
                    v-tooltip="('Yes' === row.item.in_auction)? 'Item is already in auction' : 'Auction this item'"
                    :to="{name: 'auction', params: {item:`${JSON.stringify(row.item)}`} }"
                    class="float-right btn btn-sm btn-icon-lg btn-warning mh10"
                    :class="{'clickblock': 'Yes' === row.item.in_auction}"
                    :disabled="'Yes' === row.item.in_auction"
                    :event="'Yes' !== row.item.in_auction ? 'click' : ''"
                  >
                    <i class="fa fa-gavel" aria-hidden="true"></i>
                  </router-link>
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
import LTable from "@/components/Table.vue";
import Card from "@/components/Cards/Card.vue";
import itemAPI from "@/api/item.js";

export default {
  components: {
    LTable,
    Card
  },
  data() {
    return {
      form: {
        name: '',
        description: ''
      },
      columns: {
        // id: "_id",
        name: "Product",
        description: "Description",
        in_auction: "In Auction"
      },
      data: [],
      loaded: false
    };
  },

  created() {
    if (!this.isAdmin)
      this.$router.push('/');
  },

  mounted() {
    this.loadResources();
  },
  
  methods: {
    loadResources() {
      this.loaded = false;

      itemAPI.index(this.form)
      .then(this.handleItemssData)
      .then(this.setItemssData)
      .catch(this.$helpers.notifyVueError.bind(this))
      .finally(() => this.loaded = true);
    },

    handleItemssData(response) {
      return new Promise((resolve, reject) => {
        response = response.map(res => {
          res.in_auction = (res.auction && 'opened' === res.auction.status)? "Yes" : "No";

          return res;
        })
        
        resolve(response);
      });
    },

    setItemssData(response) {
      this.data = response;
      return this.data;
    },

    search() {
      this.loadResources();
    },

    create() {
      this.$router.push('/product');
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

<style scoped>
  .mh10 {
    margin: 0 10px;
  }
</style>
