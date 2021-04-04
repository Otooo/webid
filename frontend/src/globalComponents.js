import BaseInput from './components/Inputs/BaseInput.vue';
import BaseSelect from './components/Inputs/BaseSelect.vue';
import BaseCheckbox from './components/Inputs/BaseCheckbox.vue';
import BaseRadio from './components/Inputs/BaseRadio.vue';
import BaseDropdown from './components/BaseDropdown.vue';
import Card from './components/Cards/Card.vue';
import Network from 'vue-network';

/**
 * You can register global components here and use them as a plugin in your main Vue instance
 */

const GlobalComponents = {
  install (Vue) {
    Vue.component(BaseInput.name, BaseInput);
    Vue.component(BaseSelect.name, BaseSelect);
    Vue.component(BaseCheckbox.name, BaseCheckbox);
    Vue.component(BaseRadio.name, BaseRadio);
    Vue.component(BaseDropdown.name, BaseDropdown);
    Vue.component('card', Card);
    Vue.component('network', Network);
  }
};

export default GlobalComponents;
