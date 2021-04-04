<template>
  <div>
    <load-general :loaded="loaded" />

    <table 
      v-if="loaded" 
      class="table">
      <thead>
        <slot 
          v-if="isEmpty() === false" 
          name="columns">
          <tr class="text-center">
            <th 
              v-for="column_key in Object.keys(columns)" 
              :key="column_key" 
              class="font-weight-bold">{{ columns[column_key] }}</th>
            <th 
              v-for="actionColumn in actionColumns" 
              :key="actionColumn" 
              class="font-weight-bold">{{ actionColumn }}</th>
          </tr>
        </slot>

        <div 
          v-if="isEmpty() === true" 
          class="alert alert-danger" 
          data-notify="container">
          <span data-notify="message">Data not found.</span>
        </div>
      </thead>
      <tbody>
        <tr 
          v-for="(item, index) in data" 
          :key="index">
          <slot :item="item">
            <td 
              v-for="column_key in Object.keys(columns)" 
              v-show="hasValue(item, column_key)" 
              :key="column_key">{{ itemValue(item, column_key) }}</td>
          </slot>
          <slot 
            :item="item" 
            name="actions"/>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import LoadGeneral from '@/components/Loadings/LoadGeneral.vue'

export default {
  name: 'LTable',
  components: {
    LoadGeneral
  },
  props: {
    columns: Object,
    actionColumns: Array,
    data: Array,
    loaded: Boolean
  },
  methods: {
    isEmpty() {
      return (!this.data || this.data.length < 1);
    },
    hasValue (item, column_key) {
      return item[column_key.toLowerCase()] !== 'undefined';
    },
    itemValue (item, column_key) {
      return item[column_key.toLowerCase()];
    }
  }
};
</script>

<style>
</style>
