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
            {{ item.name }}
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
                v-model="item.description"
              ></textarea>
            </div>

             <!-- NAME -->
            <div class="row">
              <div class="col-md">
                <base-input
                  type="text"
                  label="Product Name"
                  v-model="item.name"
                ></base-input>
              </div>
            </div>
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
import itemAPI from "@/api/item.js";

export default {

  data() {
    return {
      loading_save: false,
      item: {
        name: '',
        image: '',
        description: '',
      }
    };
  },
  
  mounted() {
    // const existingItem = JSON.parse(this.$route.params.item);
    // if (existingItem)
    //   this.item = existingItem;
  },

  methods: {
    create() {
      this.loading_save = true;

      itemAPI
        .store(this.item)
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
