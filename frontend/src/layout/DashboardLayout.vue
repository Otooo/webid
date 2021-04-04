<template>
  <div class="wrapper">
    <side-bar>
      <!-- <mobile-menu slot="content"/> -->
      
      <li class="text-center mb-4">
        <i class="fa fa-user-circle-o" aria-hidden="true"></i> 
        <b>Hi, {{ username }}</b>
      </li>

      <sidebar-link :to="{name: 'auctions'}">
        <i class="fa fa-gavel" aria-hidden="true"></i>
        <p>Auctions</p>
      </sidebar-link>
      
      <div v-if="isAdmin">
        <li id="dashboard-products">
          <a
            class="nav-link clearfix"
            href="#"
            @click="toggleSubMenu('dashboard-products')">
            <i class="fa fa-gift"/>
            <p>Products</p>
            <i
              id="dashboard-products-is"
              class="fa fa-caret-left float-right mr-0"/>
            <i
              id="dashboard-products-ih"
              class="fa fa-caret-down float-right mr-0"
              style="display: none"/>
          </a>
        </li>
        <div
          id="dashboard-products-menu"
          class="ml-3"
          style="display: none">
          <sidebar-link :to="{name: 'products'}">
            <i class="fa fa-bars" aria-hidden="true"/>
            <p>List</p>
          </sidebar-link>
        </div>
      </div>

      <sidebar-link v-if="isRegular" :to="{name: 'bidbot'}">
        <i class="fa fa-android" aria-hidden="true"/>
        <p>Bid Bot</p>
      </sidebar-link>
      
      <li class="clickable">
        <a @click="logout" class="nav-link clearfix">
          <i class="fa fa-sign-out" aria-hidden="true"></i>
          <p>Log out</p>
        </a>
      </li>

    </side-bar>

    <div class="main-panel">
      <top-navbar/>

      <dashboard-content @click="toggleSidebar"/>

      <content-footer/>
    </div>
  </div>
</template>

<style lang="scss">

</style>

<script>
import TopNavbar from './TopNavbar.vue';
import ContentFooter from './ContentFooter.vue';
import DashboardContent from './Content.vue';
import MobileMenu from './MobileMenu.vue';
import userAPI from "@/api/user.js";

export default {
  components: {
    TopNavbar,
    ContentFooter,
    DashboardContent,
    MobileMenu
  },

  methods: {
    toggleSubMenu(idEl) {
      let elDiv = document.getElementById(idEl);

      let el = document.getElementById(`${idEl}-menu`);
      let elIconS = document.getElementById(`${idEl}-is`);
      let elIconH = document.getElementById(`${idEl}-ih`);
      if (el.style.display == 'block') {
        el.style.display = 'none';
        elIconS.style.display = 'block';
        elIconH.style.display = 'none';
      } else  {
        el.style.display = 'block';
        elIconS.style.display = 'none';
        elIconH.style.display = 'block';
      }
    },
    toggleSidebar() {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.displaySidebar(false);
      }
    },
    logout() {
      localStorage.clear();
      this.$router.push({ name: 'login'});
    }
  },
 
  watch: {
    '$route': function (value) {
      var elDiv = document.getElementById('dashboard-products');
      if (value.path.includes('products')) {
        elDiv.classList.add('active');
      } else {
        elDiv.classList.remove('active');
      }
    }
  },

  computed: {
    user() {
      let user = JSON.parse(localStorage.getItem('user'));
      user = user? user: {id:0, name:'guest', roles:['ROLE_REGULAR']};
      
      return user;
    },
    username() {
      return this.user.name;
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
