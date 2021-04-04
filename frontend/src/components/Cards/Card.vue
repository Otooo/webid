<template>
  <div 
    :class="[type && `card-${type}`]" 
    class="card">
    <div 
      v-if="$slots.image" 
      class="card-image">
      <slot name="image"/>
    </div>
    <div 
      v-if="$slots.header || title" 
      :class="headerClasses" 
      class="card-header">
      <slot name="header">
        <h4 class="card-title">{{ title }}</h4>
        <p 
          v-if="subTitle" 
          class="card-category">{{ subTitle }}</p>
      </slot>
    </div>
    <div 
      v-if="$slots.default" 
      :class="bodyClasses" 
      class="card-body">
      <slot/>
    </div>
    <slot name="raw-content"/>
    <div 
      v-if="$slots.footer" 
      :class="footerClasses" 
      class="card-footer">
      <slot name="footer"/>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Card',
  props: {
    title: {
      type: String,
      description: 'Card title'
    },
    subTitle: {
      type: String,
      description: 'Card subtitle'
    },
    type: {
      type: String,
      description: 'Card type (e.g primary/danger etc)'
    },
    headerClasses: {
      type: [String, Object, Array],
      description: 'Card header css classes'
    },
    bodyClasses: {
      type: [String, Object, Array],
      description: 'Card body css classes'
    },
    footerClasses: {
      type: [String, Object, Array],
      description: 'Card footer css classes'
    }
  }
};
</script>
<style>
</style>
