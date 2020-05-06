import Vue from "vue";
import App from "./App.vue";
//import utils from './utils'
import Vuex from "vuex";
import localitydata from "./assets/locality.json";
import pincode from "./assets/pincode.json";

Vue.use(Vuex);
//Vue.prototype.$utils = utils;
Vue.config.productionTip = false;
const store = new Vuex.Store({
  state: {
    dataJSON: localitydata
  },
  mutations: {
    localityJSONData(state) {
      state.dataJSON = localitydata;
    },
    pincodeJSONData(state) {
      state.dataJSON = pincode;
    }
  }
});
store.commit("JSONData");

console.log(store.state.dataJSON);
new Vue({
  render: h => h(App)
}).$mount("#app");
