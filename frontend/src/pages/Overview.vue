<template>
  <div class="content">
    <div class="container-fluid">
      <!-- DATA -->
      <load-general :message="'Carregando informações...'" :loaded="loaded" />
      <div class="row" v-if="loaded">
        <div class="col-md-12">
          <div class="row">
            <div class="col-xl-6 col-md-6">
              <stats-card>
                <div 
                  slot="header" 
                  class="icon-info">
                  <i class="nc-icon nc-money-coins text-primary"/>
                </div>
                <div slot="content">
                  <p class="card-category">Anual</p>
                  <h4 class="card-title">{{ total }}</h4>
                </div>
                <div slot="footer">
                  <i class="fa fa-calendar-o"/> {{ currentYear }}
                </div>
              </stats-card>
            </div>

            <div class="col-xl-6 col-md-6">
              <stats-card>
                <div 
                  slot="header" 
                  class="icon-info">
                  <i class="nc-icon nc-money-coins text-success"/>
                </div>
                <div slot="content">
                  <p class="card-category">Este Mês</p>
                  <h4 class="card-title">{{ totalThisMonth }}</h4>
                </div>
                <div slot="footer">
                  <i class="fa fa-calendar"/> {{ currentMonth }} - {{ currentYear }}
                </div>
              </stats-card>
            </div>
          </div>
          
          <!-- CHART -->
          <div class="row">
            <div class="col-xl-12 col-md-12">
              <dashboard-chart 
                label-x="Mês" 
                label-y="Quantia"
                :title="`Acumulo ${currentYear}`"
                :data="collectionChart(data)"
                type="bar"
              />
            </div> 
          </div>

        </div>
      </div>
    </div>
  </div>
</template>
<script>
import DashboardChart from '@/components/Charts/DashboardChart.vue';
import StatsCard from '@/components/Cards/StatsCard.vue';
import CardDashboard from '@/components/Cards/DashboardCard.vue';
import LoadGeneral from '@/components/Loadings/LoadGeneral.vue'

import partnerAPI from "@/api/partner.js";
import rideAPI from "@/api/ride.js";

const nowY = new Date().getFullYear();

export default {
  components: {
    StatsCard,
    CardDashboard,
    DashboardChart,
    LoadGeneral
  },
  data () {
    return {
      currentYear: nowY,
      cities: [],
      data: [],
      loaded: true
    };
  },
  mounted() {
    this.loadResources();
  },
  methods: {
    loadResources() {
      this.loaded = false;

      this.loadCities()
        .then(this.loadAccumulated)
        .then(this.handleAccumulatedData)
        .then(this.setAccumulatedData)
        .finally(() => this.loaded = true);
    },
    loadCities() {
      return new Promise((resolve, reject) => {
        partnerAPI
        .cities()
        .then(cities => { 
          this.cities = cities 
          resolve(cities);
        })
        .catch(reject);
      })
    },
    loadAccumulated(cities) {
      const cities_id = cities.map(city => city.id)
      return rideAPI.accumulatedMonthly(cities_id, this.currentYear)
    },
    handleAccumulatedData(accumulated_monthly) {
      return new Promise((resolve, reject) => {
        if (accumulated_monthly.length == 0) {
          accumulated_monthly = [this.generateAnualArr([], 12, 'sem resultado')];
        } else { 
          accumulated_monthly.forEach((groupedCity, index) => {
            let groupedCityAux = [];
            let city_name = 'sem resultado';
            groupedCity.forEach((accumulated) => {
              city_name = accumulated.city_name
              accumulated.formatted_month = this.$helpers.getMonthNameByIndex(accumulated.month-1);
              groupedCityAux[accumulated.month-1] = accumulated;
              groupedCityAux = this.generateAnualArr(groupedCityAux, accumulated.month-1, city_name);
            });
            groupedCityAux = this.generateAnualArr(groupedCityAux, 12, city_name);
            accumulated_monthly[index] = groupedCityAux;
          });
        }
        
        resolve(accumulated_monthly);
      });
    },
    setAccumulatedData(accumulated_monthly) {
      this.data = accumulated_monthly;
      return this.data;
    },
    generateAnualArr(arrayData, index, city_name) {
      if (index == 0)
        return arrayData;

      if (typeof arrayData[index-1] === 'undefined') {
        arrayData[index-1] = {
          city_name: city_name,
          total: 0,
          month: (index),
          formatted_month: this.$helpers.getMonthNameByIndex(index-1)
        };

        return this.generateAnualArr(arrayData, index-1, city_name);
      }

      return arrayData;
    },
    collectionChart(data) {
      return {
        series: [... data.map(item => {
          const randomColor = '#'+Math.floor(Math.random()*16777215).toString(16);
          const cityName = item[0].city_name;
          return {
            data: item.map(accumuleted => accumuleted.total),
            label: cityName,
            borderColor: randomColor,
            backgroundColor: randomColor,
            fill: false
          }
        })],
        labels: [0,1,2,3,4,5,6,7,8,9,10,11].map(month => this.$helpers.getMonthNameByIndex(month)),
      };
    }
  },
  computed: {
    total() {
      let total = 0;
      this.data.forEach(grouped => {
        grouped.forEach(accumulated => {
          total += accumulated.total;
        })
      });
      return this.$helpers.formatPriceBRL(total);
    },
    totalThisMonth() {
      let total = 0;
      const thisMonth = new Date().getMonth();
      this.data.forEach(grouped => {
        grouped.forEach(accumulated => {
          if (accumulated.month == (thisMonth+1))
            total += accumulated.total;
        })
      });
      return this.$helpers.formatPriceBRL(total);
    },
    currentMonth() {
      return this.$helpers.getMonthNameByIndex(new Date().getMonth());
    },
  },
};
</script>

<style>

</style>
