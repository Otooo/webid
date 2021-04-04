<template>
  <div 
    v-if="!loaded"
    class="text-center">
    <div 
      class="spinner-border" 
      role="status">
      <span class="sr-only">{{ message }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    message: {
      type: String,
      default: 'Loading data...'
    },
    loaded: {
      type: Boolean,
      default: false
    }
  }
}
</script>
