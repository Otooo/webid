<template>
  <div>
    <canvas ref="chartjs"/>
  </div>
</template>

<script>

import Chart from 'chart.js';

export default {
  props: [
    'data',
    'chartType',
    'labelX',
    'labelY',
  ],
  data() {
    return {
      chart: null
    };
  },
  watch: {
    data(newData) {
      this.chart.data = newData;
      this.chart.update();
    },
    chartType(newType) {
      if (this.chart) this.chart.destroy();
      this.createChart();
    }
  },
  mounted() {
    this.createChart();
  },
  methods: {
    createChart() {
      let ctx = this.$refs.chartjs.getContext('2d');
      this.chart = new Chart(ctx, {
        type: this.chartType,
        data: this.data,
        options: {
          scales: {
            xAxes: [{
              ticks: {
                beginAtZero: true
              },
              scaleLabel: {
                display: true,
                labelString: this.labelX
              }
            }],
            yAxes: [{
              scaleLabel: {
                display: true,
                labelString: this.labelY,
              },
              ticks: {
                min: 0,
                precision: 0
              }
            }]
          }
        }
      });
    }
  },
};
</script>