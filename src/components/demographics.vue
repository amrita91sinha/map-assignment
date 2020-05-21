<template>
  <div id="pieGraph">
    <div v-show="noMonthlyIncomeData">No Data Available
      MonthlyIncome Distribution for {{getLocality}}</div>
    <div id="content1">
      <canvas ref="chart1"></canvas>
    </div>
  </div>
</template>

<script>
//import { mapGetters  } from 'vuex';

import Chart from "chart.js";
import expenditureData from "../assets/expenditure.json";
//import { mapGetters } from 'vuex';
import incomeData from "../assets/income.json";
//import localitydata from "../assets/locality.json";
console.log(expenditureData);
console.log(incomeData);
export default {
  name: "pieGraph",
  data() {
    return {
     barGraphData:[],
     barGraphDataArray:[],
     barGraphDataLabel:[],
     monthlyIncomeDataBarGraph:null,
     noMonthlyIncomeData:false
    };
  },
  computed:{
    getLocality(){
         return this.$store.getters.getLocality
    }

  },//:mapGetters(['getPincode']),//getter works too
  watch:{
      getLocality(){
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
  if(this.getLocality!="undefined"){
    var code=this.$store.state.locality;
    var barGraphData1=  incomeData.filter(
    function(incomeData) {
      return incomeData.locality == code
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
    this.monthlyIncomeDataBarGraph.destroy();
    this.noMonthlyIncomeData=true;
  }
  else{
    this.noMonthlyIncomeData=false;
  this.barGraphDataArray=barGraphData1[0].income;
  //this.barGraphDataArray.pop();
  // this.barGraphDataLabel=barGraphData1[0]);
 // this.barGraphDataLabel.pop();
  console.log({ barGraphData, arr: this.barGraphDataArray }, 'testdata');
  
   var chart = this.$refs.chart1;
    var ctx = chart.getContext("2d");
  var barGraphData=this.barGraphDataArray;
  //var barGraphLabels=this.barGraphDataLabel;
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
  this.monthlyIncomeDataBarGraph =  new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['income'],
        datasets: [
          {
           // label: code,
           fill:true,
            backgroundColor:'#7651da', // Blue
            data: [barGraphData],
            //borderWidth: 1,
          }
        ]
      },
      options: {
      title: {
        display: true,
        //text: 'Predicted world population (millions) in 2050'
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
#content1 {
  margin: auto;
  width: 1024px;
  background-color: #ffffff;
  padding: 20px;
}

</style>