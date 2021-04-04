<template>
  <div class="container-fluid mb-3">
    <form @submit.prevent="editServiceType">
      <!-- IMG && DESCRIPTION-->
      <div class="row">
        <!-- IMG -->
        <div class="col-md-6 no-click">
          <a href="#">
          <img 
            class="service-image"
            :src="serviceType.image" 
            @error="(event) => {event.target.src = '/img/no-image.jpg'}"
            alt="Imagem serviço"
          >
          <h4 class="title">{{ serviceType.name }}<br >
            <small>{{ serviceType.provider_name }}</small>
          </h4>
          </a>
        </div>

          <!-- DESCRIPTION -->
          <div class="col-md-6">
            <div class="form-group">
              <label>Descrição</label>
              <textarea
                rows="5"
                class="form-control border-input"
                placeholder="Breve descrição do produto"
                v-model="serviceType.description"
              ></textarea>
            </div>
          </div>
      </div>

      <!-- STATUS && TYPE-->
      <div class="row">
        <div class="col-md-6">
          <base-input
            type="text"
            label="Status"
            :disabled="true"
            :value="serviceType.status"
          ></base-input>
        </div>

        <div class="col-md-6">
          <base-input
            type="text"
            label="Tipo"
            :disabled="true"
            :value="serviceType.type"
          ></base-input>
        </div>
      </div>

      <!-- CALCULATOR && CAPACITY-->
      <div class="row">
        <div class="col-md-6">
          <base-input
            type="text"
            label="Calculador"
            :disabled="true"
            :value="serviceType.calculator"
          ></base-input>
        </div>

        <div class="col-md-6">
          <base-input
            type="text"
            label="Capacidade"
            :disabled="true"
            :value="serviceType.capacity"
          ></base-input>
        </div>
      </div>


      <!-- TAX && CANCEL_TAX && EXTRA_DESTINATION_PRICE && EXTRA_VALUE -->
      <div class="row">
        <!-- TAX -->
        <div class="col-md-3 form-group">
          <label>Tarifa</label>
          <money
            class="form-control border-input"
            placeholder="Tarifa"
            v-bind="money"
            value="serviceType.tax"
            :disabled="true"
          ></money>
        </div>
        
        <!-- CANCEL_TAX -->
        <div class="col-md-3 form-group">
          <label>Tarifa Cancelamento</label>
          <money
            class="form-control border-input"
            placeholder="Tarifa"
            v-bind="money"
            value="serviceType.cancel_tax"
            :disabled="true"
          ></money>
        </div>

        <!-- EXTRA_DESTINATION_PRICE -->
        <div class="col-md-3 form-group">
          <label>Tarifa Destino Extra</label>
          <money
            class="form-control border-input"
            placeholder="Tarifa"
            v-bind="money"
            value="serviceType.extra_destination_price"
            :disabled="true"
          ></money>
        </div>

        <!-- EXTRA_VALUE -->
        <div class="col-md-3 form-group">
          <label>Valor Extra</label>
          <money
            class="form-control border-input"
            placeholder="Tarifa"
            v-bind="money"
            value="serviceType.extra_value"
            :disabled="true"
          ></money>
        </div>
      </div>

      <!-- PRICE && MINUTE && FIXED && DISTANCE -->
      <div class="row">
        <!-- PRICE -->
        <div class="col-md-3 form-group">
          <label>Preço</label>
          <money
            class="form-control border-input"
            placeholder="Tarifa"
            v-bind="money"
            value="serviceType.price"
            :disabled="true"
          ></money>
        </div>
        
        <!-- MINUTE -->
        <div class="col-md-3 form-group">
          <label>Valor por minuto</label>
          <money
            class="form-control border-input"
            placeholder="Tarifa"
            v-bind="money"
            value="serviceType.minute"
            :disabled="true"
          ></money>
        </div>

        <!-- FIXED -->
        <div class="col-md-3 form-group">
          <label>Valor fixo</label>
          <money
            class="form-control border-input"
            placeholder="Tarifa"
            v-bind="money"
            v-model="serviceType.fixed"
            required
          ></money>
        </div>

        <!-- DISTANCE -->
        <div class="col-md-3 form-group">
          <label>Valor por distância</label>
          <money
            class="form-control border-input"
            placeholder="Tarifa"
            v-bind="money"
            v-model="serviceType.distance"
            required
          ></money>
        </div>
      </div>

      <!-- EDIT BUTTON -->
      <div class="text-center">
        <button type="submit" class="btn btn-success btn-fill float-right">
          <span v-show="loading_edit">
            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            Salvando ...
          </span>
          <span v-show="!loading_edit" :disabled="!loading_edit">Salvar alterações</span>
        </button>
      </div>
      <div class="clearfix"/>
    </form>
  </div>
</template>

<script>
import Vue from "vue";
import { Money } from "v-money";
Vue.use(Money);
import serviceTypeAPI from "@/api/serviceType.js";

export default {
  components: {
    Money
  },
  data() {
    return {
      loading_edit: false,
      money: {
        decimal: ",",
        thousands: ".",
        prefix: "R$ ",
        precision: 2,
        masked: false
      },
      serviceType: {
        id: '',
        name: '',
        provider_name: '',
        image: '',
        capacity: 0,
        fixed: 0,
        price: 0,
        minute: 0,
        distance: 0,
        calculator: '',
        description: '',
        status: '0',
        cancel_tax: '',
        extra_destination_price: '',
        city_id: '',
        type: '',
        tax: '',
        extra_value: '',
      },
    };
  },
  mounted() {
    this.serviceType = JSON.parse(this.$route.params.service_type);
  },
  methods: {
    editServiceType() {
      this.loading_edit = true;

      serviceTypeAPI
        .update(this.serviceType.id, this.serviceType)
        .then(() =>
          this.$helpers.notifyVueSuccess.bind(this)(
            "Tipo de Serviço alterado com sucesso!"
          )
        )
        .catch(this.$helpers.notifyVueError.bind(this))
        .finally(() => (this.loading_edit = false));
    }
  }
};
</script>

<style scoped>
  .service-image {
    height: 200px;
    width: 200px;
  }
  .no-click {
    pointer-events: none;
  }
</style>
