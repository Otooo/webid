<template>
  <div 
    :style="sidebarStyle"
    :data-color="backgroundColor"
    :data-image="backgroundImage"
    class="sidebar">
    <div class="sidebar-wrapper">
      <div class="logo">
        <!-- class="simple-text logo__container" -->
        <a 
          href="/"
        >
          <div class="logo-img placard">
            <img 
              src="/img/marca-rodape.png"
              alt=""
              style="padding:5px; width: 100%;" 
            >
          </div>
          {{ title }}
        </a>
      </div>

      <slot name="content"/>
      <ul class="nav nav-main__links">
        <!--By default vue-router adds an active class to each route link. This way the links are colored when clicked-->
        <slot>
          <sidebar-link 
            v-for="(link,index) in sidebarLinks"
            :key="link.name + index"
            :to="link.path"
            :link="link"
            @click="closeNavbar">
            <i :class="link.icon"/>
            <p>{{ link.name }}</p>
          </sidebar-link>
        </slot>
      </ul>
      <ul 
        v-if="$slots['bottom-links']" 
        class="nav nav-bottom">
        <slot name="bottom-links"/>
      </ul>
    </div>
  </div>
</template>
<script>
import SidebarLink from './SidebarLink.vue';

export default {
  components: {
    SidebarLink
  },
  props: {
    title: {
      type: String,
      // default: 'Webid'
      default: ''
    },
    backgroundColor: {
      type: String,
      default: 'orange',
      validator: (value) => {
        let acceptedValues = ['', 'blue', 'azure', 'green', 'orange', 'red', 'purple', 'black'];
        return acceptedValues.indexOf(value) !== -1;
      }
    },
    backgroundImage: {
      type: String,
      // default: 'img/sidebar-5.jpg'
    },
    activeColor: {
      type: String,
      default: 'success',
      validator: (value) => {
        let acceptedValues = ['primary', 'info', 'success', 'warning', 'danger'];
        return acceptedValues.indexOf(value) !== -1;
      }
    },
    sidebarLinks: {
      type: Array,
      default: () => []
    },
    autoClose: {
      type: Boolean,
      default: true
    }
  },
  provide () {
    return {
      autoClose: this.autoClose
    };
  },
  computed: {
    sidebarStyle () {
      return {
        backgroundImage: `url(${this.backgroundImage})`
      };
    }
  }
};

</script>
<style>
  .placard {
    border: dashed;
    text-align: center;
    background-color: white;
    border-radius: 5%;
    border-color: tomato;
  }
  .sidebar .sidebar-wrapper {
    display: flex;
    flex-direction: column;
  }
 .sidebar .nav-main__links {
   flex: 1;
 }
 .sidebar .sidebar-wrapper .logo .logo__container {
   padding-left: 10px;
 }
</style>
