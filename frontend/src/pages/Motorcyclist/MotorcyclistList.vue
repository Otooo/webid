<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <card
            body-classes="table-responsive"
          >
            <template slot="header">
              <h4 class="card-title">Filtrar por Motociclistas</h4>
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

                <!-- FIRST NAME -->
                <div class="col-md-4">
                  <base-input 
                    v-model="form.provider_first_name"
                    type="text"
                    label="Primeiro Nome"
                    placeholder="Primeiro nome"
                    :disabled="form.all_providers"
                  />
                </div>
                <div class="col-md-2 align-center">
                  <base-checkbox v-model="form.all_providers">Todos</base-checkbox>
                </div>
              </div>

              <div class="row">
                <!-- LAST NAME -->
                <div class="col-md-4">
                  <base-input 
                    v-model="form.provider_last_name"
                    type="text"
                    label="Último Nome"
                    placeholder="Último nome"
                    :disabled="form.all_providers"
                  />
                </div>
                
                <!-- EMAIL -->
                <div class="col-md-4">
                  <base-input 
                    v-model="form.provider_email"
                    type="text"
                    label="E-mail"
                    placeholder="E-mail"
                    :disabled="form.all_providers"
                  />
                </div>

                <!-- MOBILE -->
                <div class="col-md-4">
                  <label>Telefone</label>
                  <the-mask 
                    :mask="['(##) ####-####', '(##) #####-####']"
                    class="form-control border-input"
                    v-model="form.provider_mobile"
                    placeholder="Telefone"
                    :disabled="form.all_providers"
                  />
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
import providerAPI from "@/api/provider.js";

const tableColumns = {
  full_name: 'Nome',
  email: 'E-mail',
  mobile: 'Telefone',
  cpf: 'CPF',
  status: 'Status',
  rating: 'Avaliação',
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
    .then(() => this.loadResources([this.city.id], []))
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
    loadResources(citiesId, filter) {
      if (! citiesId[0]) {
        this.loaded = true;
        this.$helpers.notifyVueWarning.bind(this)('Escolha uma cidade primeiro.');
        return;
      }

      this.loaded = false;

      providerAPI.providers(citiesId, filter)
        .then(this.handleProviderData)
        .then(this.setProviderData)
        .finally(() => this.loaded = true);
    },

    handleProviderData(providers) {
      return new Promise((resolve, reject) => {
        providers.forEach((provider) => {
          provider.status = this.$helpers.translateStatus(provider.status);
          provider.full_name = provider.first_name + ' ' + provider.last_name;
          provider.cpf = this.$helpers.formatCPFCNPJ(provider.cpf);
          provider.mobile = this.$helpers.formatPhone(provider.mobile);
        });
        
        resolve(providers);
      });
    },
    setProviderData(providers) {
      this.data = providers;
      return this.data;
    },
    search() {
      this.loadResources([this.form.cities_id], this.filter());
    }, 
    filter() {
      return {
        'first_name': this.form.provider_first_name.trim(),
        'last_name': this.form.provider_last_name.trim(),
        'email': this.form.provider_email.trim(),
        'mobile': this.form.provider_mobile.trim(),
      }
    }
  },
  watch: {
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
