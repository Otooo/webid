<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <card
            body-classes="table-responsive"
          >
            <template slot="header">
              <h4 class="card-title">Tipos de Serviços</h4>
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
              :action-columns="['Ações']"
              :data="data"
              :loaded="loaded"
              class="table-hover table-striped break-word"
            >
              <template v-slot:actions="row">
                <td>
                  <router-link
                    v-tooltip="'Visualizar Serviço'"
                    :to="{name: 'service-type', params: {service_type:`${JSON.stringify(row.item)}`} }"
                    class="float-right btn btn-sm btn-icon-lg btn-info"
                  >
                    <i class="fa fas fa-eye" />
                  </router-link>
                </td>
              </template>
            </l-table>
            
          </card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LTable from '@/components/Table';
import partnerAPI from "@/api/partner.js";
import serviceTypeAPI from "@/api/serviceType.js";

const tableColumns = {
  // id: '#',
  city_name: 'Cidade',
  name: 'Nome',
  provider_name: 'Provedor',
  capacity: 'Capacidade',
  fixed: 'Fixo',
  price: 'Preço',
  minute: 'Por Minuto',
  distance: 'Por Distância',
  calculator: 'Calculador',
  type: 'Tipo',
  description: 'Descrição',
  status: 'Status',
};

export default {
  components: {
    LTable
  },
  data() {
    return {
      cities: {},
      form: {
        cities_id: null,
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
    .then(() => this.loadResources([this.city.id]))
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
    loadResources(citiesId) {
      if (! citiesId[0]) {
        this.loaded = true;
        this.$helpers.notifyVueWarning.bind(this)('Escolha uma cidade primeiro.');
        return;
      }

      this.loaded = false;

      serviceTypeAPI.index(citiesId)
        .then(this.handleServiceTypeData)
        .then(this.setServiceTypeData)
        .finally(() => this.loaded = true);
    },

    handleServiceTypeData(service_types) {
      return new Promise((resolve, reject) => {
        service_types.forEach((serviceType) => {
          serviceType.city_name = this.cities[serviceType.city_id],
          serviceType.created_at = this.$helpers.formatDate(serviceType.created_at);
          serviceType.fixed = this.$helpers.formatPriceBRL(serviceType.fixed);
          serviceType.price = this.$helpers.formatPriceBRL(serviceType.price);
          serviceType.minute = this.$helpers.formatPriceBRL(serviceType.minute);
          serviceType.distance = this.$helpers.formatPriceBRL(serviceType.distance);
        });
        
        resolve(service_types);
      });
    },
    setServiceTypeData(service_types) {
      this.data = service_types;
      return this.data;
    },
    search() {
      this.loadResources([this.form.cities_id]);
    }, 
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
