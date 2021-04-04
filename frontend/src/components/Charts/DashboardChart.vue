<template>
  <div class="card">    
    <div 
      class="card-header bg-white" 
      style="cursor: move;">
      <h3 class="card-title mb-0">
        <i class="fas fa-chart-pie"/>
        {{ this.title }}
      </h3>
    </div>        
    <div class="card-body">
      <chart-children 
        :data="datacollection"
        :label-x="labelX" 
        :label-y="labelY"
        :chart-type="chartType"
      />
    </div>
  </div>
</template>

<script>
  
// import chart from './Chart.js'
import chartChildren from './Chart.vue';
import axios from 'axios';

export default {
  components: {
    chartChildren
  },
  props: [
    'organization',
    'title',
    'data',
    'type',
    'labelX',
    'labelY'
  ],
  data () {
    return {
      datacollection: null,
      chartType: 'line'
    };
  },
  mounted() {
    this.chartType = this.type || this.chartType;
    this.fillData(this.data);
  },
  methods: {
    fillData({series, labels}) {
      this.datacollection = {
        datasets: series,
        labels: labels
      };        
    }
  }
};
</script>
