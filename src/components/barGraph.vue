<template>
  <div id="barGraph">
    <div v-show="noExpenditureData">No Data Available
      Expenditure for {{getPincode}}</div>
    <div id="content">
      <canvas ref="chart"></canvas>
    </div>
  </div>
</template>

<script>
//import { mapGetters  } from 'vuex';

import Chart from "chart.js";
import expenditureData from "../assets/expenditure.json";
//import { mapGetters } from 'vuex';
//import expenditureData from "../assets/expenditure.json";
console.log(expenditureData);
export default {
  name: "barGraph",
  data() {
    return {
     barGraphData:[],
     barGraphDataArray:[],
     barGraphDataLabel:[],
     expenditureDataBarGraph:null,
     noExpenditureData:false
    };
  },
  computed:{
    getPincode(){
         return this.$store.getters.getPincode
    }

  },//:mapGetters(['getPincode']),//getter works too
  watch:{
      getPincode(){
         //return this.$store.getters.getPincode
         this.drawGraph();
    }
  },
  mounted() {
    
  
 // this.drawGraph();
    
  },
  methods: {
    idLayerww(ID) {
      console.log(ID + "ID");
    },
     getDataByPincode() {
       
       
},
drawGraph(){
  if(this.getPincode!="undefined"){
    var code=this.$store.state.pincode;
    var barGraphData1=  expenditureData.filter(
    function(expenditureData) {
      return expenditureData.pincode == code
    }
  );
  console.log(code);
  // for(var i=0;i<barGraphData.length;i++){
  //     this.barGraphData.push(barGraphData[i]);
  // }
  //var a=barGraphData[0]
  // const keys = Object.keys(barGraphData[0]);
  // for (let i = 0; i < keys.length; i+=1) {
  //   this.barGraphDataArray.push(barGraphData[0][keys[i]]);
  // }
  if(barGraphData1.length==0){
    this.expenditureDataBarGraph.destroy();
    this.noExpenditureData=true;
  }
  else{
    this.noExpenditureData=false;
  this.barGraphDataArray=Object.values(barGraphData1[0]);
  this.barGraphDataArray.pop();
   this.barGraphDataLabel=Object.keys(barGraphData1[0]);
  this.barGraphDataLabel.pop();
  console.log({ barGraphData, arr: this.barGraphDataArray }, 'testdata');
  
   var chart = this.$refs.chart;
    var ctx = chart.getContext("2d");
  var barGraphData=this.barGraphDataArray;
  var barGraphLabels=this.barGraphDataLabel;
   // var code= this.$store.pincode;
//console.log(barGraphData);
// var found =  function getDataByPincode(code) {
//   return expenditureData.filter(
//     function(expenditureData) {
//       return expenditureData.code == code
//     }
//   );
// }
    //this/.$on("clicked", FID);
  this.expenditureDataBarGraph =  new Chart(ctx, {
      type: "bar",
      data: {
        labels: barGraphLabels,
        datasets: [
          {
            label: "Expenditure Data",
            backgroundColor:'#7651da', // Blue
            data: barGraphData,
            borderWidth: 1,
          }
        ]
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ]
        }
      }
    });
}
  }
  }
  }
};
</script>

<style>
#barGraph {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
#content {
  margin: auto;
  width: 1024px;
  background-color: #ffffff;
  padding: 20px;
}

</style>