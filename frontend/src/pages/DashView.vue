<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-9">
          <div class="row">
            <div class="col-xl-6 col-md-6">
              <stats-card>
                <div 
                  slot="header" 
                  class="icon-info">
                  <i class="nc-icon nc-money-coins text-primary"/>
                </div>
                <div slot="content">
                  <p class="card-category">Hoje</p>
                  <h4 class="card-title">R$ 00,00</h4>
                </div>
                <div slot="footer">
                  <i class="fa fa-refresh"/>Updated now
                </div>
              </stats-card>
            </div>

            <div class="col-xl-6 col-md-6">
              <stats-card>
                <div 
                  slot="header" 
                  class="icon-info">
                  <i class="nc-icon nc-money-coins text-primary"/>
                </div>
                <div slot="content">
                  <p class="card-category">Este Mês</p>
                  <h4 class="card-title">R$ 00,00</h4>
                </div>
                <div slot="footer">
                  <i class="fa fa-refresh"/>Updated now
                </div>
              </stats-card>
            </div>
          </div>
          <div class="row">
            <div class="col-xl-4 col-md-6">
              <stats-card>
                <div 
                  slot="header" 
                  class="icon-warning">
                  <i class="nc-icon nc-money-coins text-warning"/>
                </div>
                <div slot="content">
                  <p class="card-category">Saldo pendente</p>
                  <h4 class="card-title">R$ 00,00</h4>
                </div>
                <div slot="footer">
                  <i class="fa fa-refresh"/>Updated now
                </div>
              </stats-card>
            </div>

            <div class="col-xl-4 col-md-6">
              <stats-card>
                <div 
                  slot="header" 
                  class="icon-success">
                  <i class="nc-icon nc-money-coins text-success"/>
                </div>
                <div slot="content">
                  <p class="card-category">Saldo disponível</p>
                  <h4 class="card-title">R$ 00,00</h4>
                </div>
                <div slot="footer">
                  <i class="fa fa-calendar-o"/>Last day
                </div>
              </stats-card>
            </div>

            <div class="col-xl-4 col-md-6">
              <stats-card>
                <div 
                  slot="header" 
                  class="icon-info">
                  <i class="nc-icon nc-money-coins text-primary"/>
                </div>
                <div slot="content">
                  <p class="card-category">Saldo Total</p>
                  <h4 class="card-title">R$ 00,00</h4>
                </div>
                <div slot="footer">
                  <i class="fa fa-refresh"/>Updated now
                </div>
              </stats-card>
            </div>
            <div class="col-12">
              <dashboard-chart 
                label-x="Dias do mês" 
                label-y="Quantidade de Vendas" 
                title="Vendas"/>
            </div> 
          </div>
        </div>
        <div class="col-md-3">
          <div class="col-12">
            <card-dashboard button-text="Próximos 30 dias">
              <div 
                slot="header" 
                class="icon-info">
                <i class="nc-icon nc-money-coins text-primary"/>
              </div>
              <div slot="content">
                <h5 class="card-title">Previsão de Recebimento</h5>
              </div>
            </card-dashboard>
          </div>
          <div class="col-12">
            <card-dashboard button-text="Consultar">
              <div 
                slot="header" 
                class="icon-info">
                <i class="nc-icon nc-money-coins text-primary"/>
              </div>
              <div slot="content">
                <h5 class="card-title">Histórico de Retiradas</h5>
              </div>
            </card-dashboard>
          </div>
          <div class="col-12">
            <card-dashboard button-text="Sacar">
              <div 
                slot="header" 
                class="icon-info">
                <i class="nc-icon nc-money-coins text-primary"/>
              </div>
              <div slot="content">
                <h5 class="card-title">Saque de Recebíveis</h5>
              </div>
            </card-dashboard>
          </div>
          <div class="col-12">
            <card-dashboard button-text="Antecipar">
              <div 
                slot="header" 
                class="icon-info">
                <i class="nc-icon nc-money-coins text-primary"/>
              </div>
              <div slot="content">
                <h5 class="card-title">Antecipar Recebíceis</h5>
              </div>
            </card-dashboard>
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
import LTable from '@/components/Table.vue';

export default {
  components: {
    LTable,
    StatsCard,
    CardDashboard,
    DashboardChart
  },
  data () {
    return {      
         
    };
  }
};
</script>
<style>

</style>
