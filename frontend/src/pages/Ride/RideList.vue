<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <card
            body-classes="table-responsive"
          >
            <template slot="header">
              <h4 class="card-title">Corridas</h4>
            </template>

            <div class="mb-5">
              <div class="row">
                <!-- CIDADES -->
                <div class="col-md-6">
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

                <!-- QUANTIDADE -->
                <div class="col-md-4">
                  <base-input 
                    v-model="form.amount"
                    type="number"
                    min="1"
                    label="Quantidade de Registros"
                    placeholder="Quanatidade de corridas listadas"
                    :disabled="form.all_rides"
                    required
                  />
                </div>
                <div class="col-md-2 align-center">
                  <base-checkbox v-model="form.all_rides">Todos</base-checkbox>
                </div>
              </div>

              <hr />
              <span class="text-center"><label>Motociclistas</label></span>
              <hr />
              <div class="row">
                <!-- FIRST NAME -->
                <div class="col-md-6">
                  <base-input 
                    v-model="form.provider_first_name"
                    type="text"
                    label="Primeiro Nome"
                    placeholder="Primeiro nome"
                    :disabled="form.all_providers"
                  />
                </div>

                <!-- LAST NAME -->
                <div class="col-md-6">
                  <base-input 
                    v-model="form.provider_last_name"
                    type="text"
                    label="Último Nome"
                    placeholder="Último nome"
                    :disabled="form.all_providers"
                  />
                </div>
                
                <!-- EMAIL -->
                <div class="col-md-5">
                  <base-input 
                    v-model="form.provider_email"
                    type="text"
                    label="E-mail"
                    placeholder="E-mail"
                    :disabled="form.all_providers"
                  />
                </div>

                <!-- MOBILE -->
                <div class="col-md-5">
                  <label>Telefone</label>
                  <the-mask 
                    :mask="['(##) ####-####', '(##) #####-####']"
                    class="form-control border-input"
                    v-model="form.provider_mobile"
                    placeholder="Telefone"
                    :disabled="form.all_providers"
                  />
                </div>

                <!-- CHECKBOX TODOS MOTOCICLISTAS -->
                <div class="col-md-2 align-center">
                <base-checkbox v-model="form.all_providers">Não informar</base-checkbox>
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

            <l-table 
              :columns="columns"
              :data="data"
              :loaded="loaded"
              class="table-hover table-striped break-word"
            />
          </card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LTable from '@/components/Table';
import {TheMask} from 'vue-the-mask'
import partnerAPI from "@/api/partner.js";
import rideAPI from "@/api/ride.js";

const tableColumns = {
  // id: '#',
  city_name: 'Cidade',
  created_at: 'Data',
  booking_id: 'Booking',
  // user_name: 'Cliente',
  user_email: 'E-mail Cliente',
  // provider_name: 'Provedor',
  provider_email: 'E-mail Provedor',
  type: 'Tipo',
  distance: 'Distância',
  status: 'Status',
  cancelled_by: 'Cancelado Por',
  value_paid: 'Valor Pago',
};

export default {
  components: {
    LTable,
    TheMask
  },
  data() {
    return {
      cities: {},
      form: {
        cities_id: null,
        all_rides: true,
        amount: 0,
        all_providers: true,
        provider_first_name: '',
        provider_last_name: '',
        provider_email: '',
        provider_mobile: '',
      },
      city: {
        id: '',
        name: ''
      },
      columns: {...tableColumns},
      data: [],
      loaded: true
    };
  },
  mounted() {
    this.city.id = this.$route.params.city_id;
    this.loadCities()
    .then(() => this.loadResources([this.city.id], 0, []))
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
    loadResources(citiesId, amount, filter) {
      if (! citiesId[0]) {
        this.loaded = true;
        this.$helpers.notifyVueWarning.bind(this)('Escolha uma cidade primeiro.');
        return;
      }

      this.loaded = false;

      rideAPI.rides(citiesId, amount, filter)
        .then(this.handleRideData)
        .then(this.setRideData)
        .finally(() => this.loaded = true);
    },

    handleRideData(rides) {
      return new Promise((resolve, reject) => {
        rides.forEach((ride) => {
          ride.status = this.$helpers.translateStatus(ride.status);
          ride.city_name = this.cities[ride.city_id],
          ride.created_at = this.$helpers.formatDate(ride.created_at);
          if (ride.user) {
            ride.user_name = ride.user.first_name;
            ride.user_email = ride.user.email;
          } else {
            ride.user_name = 'Não definido';
            ride.user_email = 'Não definido';
          }
          if (ride.provider) {
            ride.provider_name = ride.provider.first_name;
            ride.provider_email = ride.provider.email;
          } else {
            ride.provider_name = 'Não definido';
            ride.provider_email = 'Não definido';
          }
          ride.distance = ride.distance + ' Km(s)';
          if (ride.payment) {
            ride.cancelled_by = '-',
            ride.value_paid = this.$helpers.formatPriceBRL(ride.payment.total);
          } else {
            ride.value_paid = 'R$ 0,00';
          }
        });
        
        resolve(rides);
      });
    },
    setRideData(rides) {
      this.data = rides;
      return this.data;
    },
    filter() {
      return {
        'first_name': this.form.provider_first_name.trim(),
        'last_name': this.form.provider_last_name.trim(),
        'email': this.form.provider_email.trim(),
        'mobile': this.form.provider_mobile.trim(),
      }
    },
    search() {
      this.loadResources([this.form.cities_id], this.form.amount, this.filter());
    },
  },
  watch: {
    'form.all_rides': function() {
      this.form.amount = this.form.all_rides? 0:20;
    },
    'form.all_providers': function() {
      if (this.form.all_providers) {
        this.form.provider_first_name = '';
        this.form.provider_last_name  = '';
        this.form.provider_mobile     = '';
        this.form.provider_email      = '';
      }
    }
  },
  computed: {
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
  .align-center {
    align-self: center;
  }
</style>
