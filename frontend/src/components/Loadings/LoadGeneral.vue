<template>
  <div 
    v-if="!loaded"
    class="text-center">
    <div 
      class="spinner-border" 
      role="status">
    </div>
    <span class="ml-2">{{ message }}</span>
  </div>
</template>
<script>
export default {
  props:{
    message: {
      type: String,
      default: 'Loading...'
    },
    loaded: {
      type: Boolean,
      default: false
    }
  }
}
</script>
