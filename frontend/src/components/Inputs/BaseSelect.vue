<template>
  <div class="form-group">
    
    <slot name="label">
      <label 
        v-if="label" 
        class="control-label">
        {{ label }}
      </label>
    </slot>
    
    <select 
      :value="value"
      v-bind="$attrs"
      class="custom-select"
      v-on="listeners"
      >
        
      <slot name="options"/>

    </select>
    
  </div>
</template>

<script>
export default {
  name: 'BaseSelect',
  inheritAttrs: false,
  props: {
    label: {
      type: String,
      description: 'Select label'
    },
    value: {
      type: [String, Number],
      description: 'Select value'
    },
    options: {
      type: Array,
      description: 'Select Options'
    }
  },
  computed: {
    listeners() {
      return {
        ...this.$listeners,
        input: this.onInput,
        blur: this.onBlur,
        focus: this.onFocus,
        change: this.onChange
      };
    }
  },
  methods: {
    onChange(evt) {
      this.$emit('change', evt.target.value);
    },
    onInput(evt) {
      this.$emit('input', evt.target.value);
    },
    onFocus() {
      this.focused = true;
    },
    onBlur() {
      this.focused = false;
    }
  }
};
</script>
