<template>
  <div 
    :class="{disabled: disabled}" 
    class="form-check">
    
    <label 
      :for="cbId" 
      class="form-check-label">
      <input 
        :id="cbId"
        :disabled="disabled"
        v-model="model"
        class="form-check-input"
        type="checkbox" >
        
      <span class="form-check-sign"/>

      <span>
        <slot/>
      </span>

    </label>

  </div>
</template>

<script>
export default{
  name: 'BaseCheckbox',
  model: {
    prop: 'checked'
  },
  props: {
    checked: [Array, Boolean],
    disabled: [Boolean, String],
    inline: Boolean
  },
  data () {
    return {
      cbId: ''
    };
  },
  computed: {
    model: {
      get () {
        return this.checked;
      },
      set (check) {
        this.$emit('input', check);
      }
    },
    inlineClass () {
      if (this.inline) {
        return 'checkbox-inline';
      }
    }
  },
  created () {
    this.cbId = Math.random().toString(16).slice(2);
  }
};
</script>

<style scoped>
  span {
    cursor: pointer;
  }
  
  .form-check .form-check-label {
    padding-left: 25px !important;
  }

  .form-check .form-check-sign::before, .form-check .form-check-sign::after {
    margin-top: 0 !important;
  }
</style>