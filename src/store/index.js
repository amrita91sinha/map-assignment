import Vue from "vue";
import Vuex from "vuex";
import localitydata from "../assets/locality.json";
import pincode from "../assets/pincode.json";

Vue.use(Vuex);

// const store = new Vuex.Store({
//   state: {

//   },
//   mutations: {
//     localityJSONData(state) {
//       state.dataJSON = localitydata;
//     },
//     pincodeJSONData(state) {
//       state.dataJSON = pincode;
//     }
//   }
// });

const state = {
  dataJSON: localitydata,
  pincode:null,
  locality:null,
  dataPopulation:null
};

export default new Vuex.Store({
  state,
  mutations: {
    localityJSONData: (state) => {

      console.log({ localitydata, state }, 'mutations');
      state.dataJSON = localitydata;
    },
    pincodeJSONData: (state) => {
      state.dataJSON = pincode;
    },
    clickedPincode:(state,payload) =>{

      state.pincode=payload;
      console.log({ payload, state }, 'mutations');
    },
    clickedlocality:(state,payload) =>{
      state.locality=payload;
      console.log({ payload, state }, 'mutationsFID');
    },
    dataPopulation:(state,payload)=>{
        state.dataPopulation=payload;
    }

  },
  getters:{
    getPincode:(state)  => {
      return state.pincode
    },
    getLocality:(state)  => {
      return state.locality
    }
  }

});
