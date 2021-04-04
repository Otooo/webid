<template>
  <div :class="{'nav-open': $sidebar.showSidebar}">
    <network :changedOnly="true" @changed="checkNetwork" />
    <notifications/>
    <router-view/>
  </div>
</template>

<script>
export default {
  methods: {
    checkNetwork(networkStatus) {
      this.$helpers.network.bind(this)(networkStatus);
    }
  }
};
</script>

<style lang="scss">
  /* Custom */
  .btn-icon-lg {
    i {
      font-size: large;
    }
  }
  .table-responsive {
    width: auto !important;
  }
  .break-word .table > tbody > tr {
    word-break: break-word !important;
  }


  /* Notification */
  .vue-notifyjs.notifications {
    .list-move {
      transition: transform 0.3s, opacity 0.4s;
    }
    .list-item {
      display: inline-block;
      margin-right: 10px;

    }
    .list-enter-active {
      transition: transform 0.2s ease-in, opacity 0.4s ease-in;
    }
    .list-leave-active {
      transition: transform 1s ease-out, opacity 0.4s ease-out;
    }

    .list-enter {
      opacity: 0;
      transform: scale(1.1);

    }
    .list-leave-to {
      opacity: 0;
      transform: scale(1.2, 0.7);
    }
  }

  /* ToolTip */
  .tooltip {
    display: block !important;
    z-index: 10000;
  }
  .tooltip .tooltip-inner {
    background: black;
    color: white;
    border-radius: 16px;
    padding: 5px 10px 4px;
  }
  .tooltip .tooltip-arrow {
    width: 0;
    height: 0;
    border-style: solid;
    position: absolute;
    margin: 5px;
    border-color: black;
    z-index: 1;
  }
  .tooltip[x-placement^="top"] {
    margin-bottom: 5px;
  }
  .tooltip[x-placement^="top"] .tooltip-arrow {
    border-width: 5px 5px 0 5px;
    border-left-color: transparent !important;
    border-right-color: transparent !important;
    border-bottom-color: transparent !important;
    bottom: -5px;
    left: calc(50% - 5px);
    margin-top: 0;
    margin-bottom: 0;
  }
  .tooltip[x-placement^="bottom"] {
    margin-top: 5px;
  }
  .tooltip[x-placement^="bottom"] .tooltip-arrow {
    border-width: 0 5px 5px 5px;
    border-left-color: transparent !important;
    border-right-color: transparent !important;
    border-top-color: transparent !important;
    top: -5px;
    left: calc(50% - 5px);
    margin-top: 0;
    margin-bottom: 0;
  }
  .tooltip[x-placement^="right"] {
    margin-left: 5px;
  }
  .tooltip[x-placement^="right"] .tooltip-arrow {
    border-width: 5px 5px 5px 0;
    border-left-color: transparent !important;
    border-top-color: transparent !important;
    border-bottom-color: transparent !important;
    left: -5px;
    top: calc(50% - 5px);
    margin-left: 0;
    margin-right: 0;
  }
  .tooltip[x-placement^="left"] {
    margin-right: 5px;
  }
  .tooltip[x-placement^="left"] .tooltip-arrow {
    border-width: 5px 0 5px 5px;
    border-top-color: transparent !important;
    border-right-color: transparent !important;
    border-bottom-color: transparent !important;
    right: -5px;
    top: calc(50% - 5px);
    margin-left: 0;
    margin-right: 0;
  }
  .tooltip.popover .popover-inner {
    background: #f9f9f9;
    color: black;
    padding: 24px;
    border-radius: 5px;
    box-shadow: 0 5px 30px rgba(black, .1);
  }
  .tooltip.popover .popover-arrow {
    border-color: #f9f9f9;
  }
  .tooltip[aria-hidden='true'] {
    visibility: hidden;
    opacity: 0;
    transition: opacity .15s, visibility .15s;
  }
  .tooltip[aria-hidden='false'] {
    visibility: visible;
    opacity: 1;
    transition: opacity .15s;
  }

  /* Others  */
  .clickable {
    cursor: pointer !important;
  }
  .clickblock {
    cursor: not-allowed !important;
  }
  .mt-0 {
    margin-top: 0;
  }
  .pt-0 {
    padding-top: 0;
  }
  .mb-4 {
    margin-bottom: 4px;
  }
</style>
