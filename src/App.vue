<template>
  <div id="app">
    <div class="container">
      <div class="rowContainer">
        <div class="colContainer">
          <div class="toolBar">
            <div>Report Locality ID</div>
            <!-- <div class="buttonCSS">Locality</div> -->
            <button
              id="toggleData"
              style="float: right; height:20%; width:5%;font-size:12%"
              @click="toggleButton"
            >Locality</button>
          </div>
        </div>
      </div>
      <div class="rowContainer">
        <div class="colContainer">
          <!-- <Assignment msg="Welcome to Your Vue.js App" /> -->
          <bar-graph></bar-graph>
        </div>
        <div class="colContainer"  v-if="showlocality">
          <Assignment msg="Welcome to Your Vue.js App" />
          <!-- <Assignmentpincode v-show="showPincode"/> -->
        </div>
        <div class="colContainer" v-else>
          <!-- <Assignment v-show="showlocality" msg="Welcome to Your Vue.js App" /> -->
          <Assignmentpincode />
        </div>
      </div>
      <div class="rowContainer">
        <div class="colContainer">
          <!-- <Assignment msg="Welcome to Your Vue.js App" /> -->
          <demographics></demographics>
        </div>
        <div class="colContainer">
          <!-- <Assignment msg="Welcome to Your Vue.js App" /> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Assignment from "./components/Assignment.vue";
import barGraph from "./components/barGraph.vue";
import Assignmentpincode from "./components/Assignmentpincode.vue";
import demographics from "./components/demographics.vue";

export default {
  name: "App",
  //store,
  components: {
    Assignment,
    barGraph,
    Assignmentpincode,
    demographics
  },
  // computed: {
  //   dataJSON() {
  //     return this.$store.state.dataJSON;
  //   }
  // },
  data() {
    return {
      //store: store
      showlocality:true,
      showPincode:false
    };
  },
  methods: {
    toggleButton() {
      console.log(document.getElementById("toggleData").innerHTML);
      if (document.getElementById("toggleData").innerHTML == "Locality") {
        this.showlocality=false;
        this.showPincode=true;
        document.getElementById("toggleData").innerHTML = "Pincode";
        // this.$emit("toggleJSONData", "Pincode");
        this.$store.commit("pincodeJSONData");
      } else {
        document.getElementById("toggleData").innerHTML = "Locality";
        this.showPincode=false;
        this.showlocality=true;
        // this.$emit("toggleJSONData", "Locality");
        this.$store.commit("localityJSONData");
      }
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #78828d;
  height: 100%;
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: row;
}
html,
body {
  height: 100%;
  flex: 1;
}
.container {
  display: flex;
  flex-direction: column;
  flex: 1;
}
.rowContainer {
  display: flex;
  flex-direction: row;
  flex: 1;
}
.colContainer {
  display: flex;
  flex-direction: row;
  flex: 1;
}
.toolBar {
  background-color: #dddddd;
  float: left;
  margin: inherit;
  width: 100%;
  height: 50%;
}
.buttonCSS {
  position: relative;
  float: right;
  height: 35px;
  width: 65px;
  border-radius: 5px;
  border: solid;
  border-color: white;
  border: 2px;
  background-color: black;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 90%;
}
</style>
