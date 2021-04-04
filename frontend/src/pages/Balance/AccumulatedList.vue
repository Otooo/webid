<template>
  <div class="content">
    <div class="container-fluid">
      <!-- SEARCH -->
      <card>
        <template slot="header">
          <h4 class="card-title">Acumulado</h4>
        </template>

        <div class="mb-5">
          <div class="row">
            <!-- CIDADES -->
            <div class="col-md-8">
              <base-select 
                v-model="form.cities_id"
                label="Cidades"
                :disabled="!loaded"
                required
              >
                <template v-slot:options>
                  <option 
                    value
                    disabled
                    :selected="true"
                  >
                    {{ selectCity }}
                  </option>
                  <option 
                    v-for="(city, value) in cities" 
                    :key="value" 
                    :value="value">{{ city }}
                  </option>
                </template>
              </base-select>
            </div>

            <div class="col-md-4">
              <base-select 
                v-model="form.year"
                label="Ano referente"
                required
              >
                <template v-slot:options>
                  <option 
                    value
                    disabled
                    :selected="true"
                  >
                    Selecione o ano
                  </option>
                  <option 
                    v-for="year in years" 
                    :key="year" 
                    :value="year">{{ year }}
                  </option>
                </template>
              </base-select>
            </div>
          </div>

          <div class="row">
            <div class="col-md-12 text-right">
              <button 
                class="btn btn-primary btn-fill" 
                :disabled="!loaded"
                @click="search()">Buscar</button>
            </div>
          </div>
          <hr>
        </div>
      <!-- AQUI <card> -->
        
        <!-- DATA -->
        <load-general :loaded="loaded" />
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
                    <i class="fa fa-calendar-o"/> {{ yearSelected }}
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
                    <i class="fa fa-calendar"/> {{ currentMonth }} - {{ yearSelected }}
                  </div>
                </stats-card>
              </div>
            </div>
           
            <!-- CHART -->
            <div class="row">
              <div v-for="(dataCityMonth, index) in data" :key="index" class="col-xl-12 col-md-12">
                <dashboard-chart 
                  label-x="Mês" 
                  label-y="Quantia"
                  :title="`Acumulo ${yearSelected}`"
                  :data="pluckChart(dataCityMonth)"
                  type="bar"
                />
              </div> 
            </div>

          </div>
        </div>

      <!-- OU AQUI --> </card>
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
      years: [],
      cities: {},
      title: 'Sem resultado',
      form: {
        cities_id: null,
        year: nowY
      },
      city: {
        id: '',
        name: ''
      },
      data: [],
      loaded: true
    };
  },
  mounted() {
    this.years = [];
    for (let i=0; i<11; i++) {
      this.years.push(nowY - i);
    }
    
    this.city.id = this.$route.params.city_id;
    this.loadCities()
    .then(() => this.loadResources([this.city.id], this.form.year))
    .then(() => {this.form.cities_id = this.city.id;});
  },
  methods: {
    loadCities() {
      this.loaded = false;

      return new Promise((resolve, reject) => {
        partnerAPI
        .cities()
        .then(cities => {
          this.cities = [];
          let infoC = {};
          cities.forEach(({id, name}) => {
            infoC[id] = name;
          });
          this.cities = {...infoC};
          resolve();
        })
        .catch(reject);
      })
    },
    loadResources(citiesId, year) {
      if (! citiesId[0]) {
        this.loaded = true;
        this.$helpers.notifyVueWarning.bind(this)('Escolha uma cidade primeiro.');
        return;
      }

      this.loaded = false;

      rideAPI.accumulatedMonthly(citiesId, year)
        .then(this.handleAccumulatedData)
        .then(this.setAccumulatedData)
        .finally(() => this.loaded = true);
    },

    handleAccumulatedData(accumulated_monthly) {
      return new Promise((resolve, reject) => {
        if (accumulated_monthly.length == 0) {
          accumulated_monthly = [this.generateAnualArr([], 12)];
        } else { 
          accumulated_monthly.forEach((groupedCity, index) => {
            let groupedCityAux = [];
            groupedCity.forEach((accumulated) => {
              this.title = accumulated.city_name;
              accumulated.formatted_total = this.$helpers.formatPriceBRL(accumulated.total);
              accumulated.formatted_month = this.$helpers.getMonthNameByIndex(accumulated.month-1);
              groupedCityAux[accumulated.month-1] = accumulated;
              groupedCityAux = this.generateAnualArr(groupedCityAux, accumulated.month-1);
            });
            groupedCityAux = this.generateAnualArr(groupedCityAux, 12);
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
    search() {
      this.loadResources([this.form.cities_id], this.form.year);
    },
    generateAnualArr(arrayData, index) {
      if (index == 0)
        return arrayData;

      if (typeof arrayData[index-1] === 'undefined') {
        arrayData[index-1] = {
          total: 0,
          month: (index),
          formatted_total: 'R$ 0,00',
          formatted_month: this.$helpers.getMonthNameByIndex(index-1)
        };

        return this.generateAnualArr(arrayData, index-1);
      }

      return arrayData;
    },
    pluckChart(data) {
      return {
        series: [{
          data: data.map(accumuleted => accumuleted.total),
          label: this.title,
          borderColor: '#ff8080',
          backgroundColor:'#ff8080',
          fill: false
        }],
        labels: data.map(accumuleted => accumuleted.formatted_month),
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
    yearSelected() {
      return this.form.year;
    },
    currentMonth() {
      return this.$helpers.getMonthNameByIndex(new Date().getMonth());
    },
    selectCity() {
      if (Object.keys(this.cities).length < 1)
        return "Carregando cidades...";

      if (this.city.id)
        return "Aguarde..."

      return "Selecione uma cidade";
    }
  },
};
</script>

<style>

</style>
