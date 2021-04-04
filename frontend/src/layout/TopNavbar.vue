<template>
  <nav class="navbar navbar-expand-lg">
    <div class="container-fluid">
      <a 
        class="navbar-brand" 
        href="/">Go to Auctions</a>
      <button
        :class="{toggled: $sidebar.showSidebar}"
        type="button"
        class="navbar-toggler navbar-toggler-right"
        aria-controls="navigation-index"
        aria-expanded="false"
        aria-label="Toggle navigation"
        @click="toggleSidebar"
      >
        <span class="navbar-toggler-bar burger-lines"/>
        <span class="navbar-toggler-bar burger-lines"/>
        <span class="navbar-toggler-bar burger-lines"/>
      </button>

      <div class="collapse navbar-collapse justify-content-end">
        <!--<ul class="nav navbar-nav mr-auto">
           <li class="nav-item">
            <a class="nav-link" href="#" data-toggle="dropdown">
              <i class="nc-icon nc-palette"></i>
            </a>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link">
              <i class="nc-icon nc-zoom-split"></i>
              <span class="d-lg-block">&nbsp;Search</span>
            </a>
          </li>
        </ul>-->
        <ul class="navbar-nav ml-auto">
          {{ username }}: {{ isAdmin? "Admin":"Regular"}}
          <!-- <base-dropdown tag="li">
            <template slot="title">
              <i class="nc-icon nc-bell-55"/>
              <b class="caret"/>
              <span class="notification">5</span>
            </template>
            <a 
              class="dropdown-item" 
              href="#">Notification 1</a>
            <a 
              class="dropdown-item" 
              href="#">Notification 2</a>
            <a 
              class="dropdown-item" 
              href="#">Notification 3</a>
            <a 
              class="dropdown-item" 
              href="#">Notification 4</a>
            <a 
              class="dropdown-item" 
              href="#">Another notification</a>
          </base-dropdown> -->
          <!-- <base-dropdown :title="username">
            <a 
              class="dropdown-item" 
              href="#"> {{ isAdmin? "Admin":"Regular"}}
            </a> -->
            <!--<a 
              class="dropdown-item" 
              href="#">Outras Informações</a>
            <div class="divider"/> -->
            <!-- <button 
              class="dropdown-item" 
              @click="logout">Sair
            </button> -->
          <!-- </base-dropdown> -->
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import userAPI from "@/api/user.js";
import accessAPI from "@/api/access.js";

export default {
  data() {
    return {
      activeNotifications: false
    };
  },
  computed: {
    routeName() {
      const { name } = this.$route;
      return this.capitalizeFirstLetter(name);
    },
    user() {
      return JSON.parse(localStorage.getItem('user'));
    },
    username() {
      if (this.user)
        return this.user.name;

      this.profile();
      return 'Searching...'
    },
    isAdmin() {
      return this.user.roles.includes('ROLE_ADMIN');
    },
    isRegular() {
      return this.user.roles.includes('ROLE_REGULAR');
    }
  },
  methods: {
    profile() {
      userAPI.profile()
      .then(user => {
        localStorage.setItem('user', JSON.stringify(user));
      })
    },
    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
    toggleNotificationDropDown() {
      this.activeNotifications = !this.activeNotifications;
    },
    closeDropDown() {
      this.activeNotifications = false;
    },
    toggleSidebar() {
      this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
    },
    hideSidebar() {
      this.$sidebar.displaySidebar(false);
    }
  }
};
</script>

<style>
</style>
