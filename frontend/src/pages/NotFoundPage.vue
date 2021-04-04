<template>
  <div class="contact-us full-screen">
    
    <div class="wrapper wrapper-full-page section content">
      <div class="container">
        <div class="text-center">
          <h2 class="title text-danger">404 Not Found</h2>
          <h2 class="title">Oops! Page not found.</h2>
        </div>
      </div>
    </div>
    
    <footer class="footer-demo">
      <div class="container">
        <nav class="pull-left">
          <router-link 
            :to="{path:'/'}" 
            class="text-muted">Dashboard</router-link>
        </nav>
        <div class="copyright text-center">
          &copy; 2021 - {{ currentYear }}. Powered by
          <a 
            href="https://otooo.github.io/otooo/" 
            target="_blank">Oto</a>.
          <i class="fa fa-heart" style="color: rgb(255, 51, 51); caret-color: rgb(255, 51, 51);" aria-hidden="true"></i>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      currentYear: 2021
    };
  },
  mounted() {
    this.currentYear = new Date().getFullYear();
  },
};
</script>
