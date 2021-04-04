import { Line, mixins } from 'vue-chartjs';
const { reactiveProp } = mixins;

export default {
  extends: Line,
  mixins: [reactiveProp],
  props: [
    'chartData',
    'labelX',
    'labelY'
  ],
  data() {
    return {
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxes: [{
            scaleLabel: {
              display: true,
              labelString: this.labelX
            }
          }],
          yAxes: [{
            scaleLabel: {
              display: true,
              labelString: this.labelY
            }
          }]
        }
      }
    };
  },
  mounted () {
    this.renderChart(this.chartData, this.options);
  }
};