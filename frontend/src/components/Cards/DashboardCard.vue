<template>
  <card class="card-stats margins-card">
    <div class="row">
      <div 
        v-if="$slots.content" 
        class="col-12">
        <div class="text-center">
          <slot name="content"/>
        </div>
      </div>
    </div>
    <div 
      slot="footer" 
      class="stats">
      <button 
        type="button" 
        class="btn btn-secondary">{{ buttonText }}</button>      
    </div>
  </card>
</template>
<script>
import Card from './Card.vue';
export default {
  name: 'CardDashboard',
  components: {
    Card
  },
  props:[
    'buttonText'
  ]
};

</script>
<style scoped>
  .btn{
    margin-top: 10%;
    padding-top: 1%;
    padding-bottom: 1%;
    font-size: 14px;
  }

  .margins-card{
    margin-left: 15%;
    margin-right: 15%;
    align-items: center;
  }
</style>
