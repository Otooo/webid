<template>
  <footer class="footer">
    <div class="container-fluid">
      <div class="copyright text-center">
        &copy; 2021 - {{ currentYear }}. Powered by
        <a 
          href="https://otooo.github.io/otooo/" 
          target="_blank">Oto</a>.
        <i class="fa fa-heart" style="color: rgb(255, 51, 51); caret-color: rgb(255, 51, 51);" aria-hidden="true"></i>
      </div>
    </div>
  </footer>
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

<style>
</style>
