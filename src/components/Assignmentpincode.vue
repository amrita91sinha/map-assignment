<template>
  <div class="assignment">
    <p>{{ requiredData.features[0].attributes.pincode }}</p>
    <mapbox
      access-token="pk.eyJ1IjoiYW1yaXRhOTFzaW5oYSIsImEiOiJjazk2cnNtbHYwNWt5M2xtZ2Zkcnd5bzBjIn0.r-vthwmTHDI4IwUIQIlYwQ"
      :map-options="{
        container: 'map1',  
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [77.600072999999995,
              12.992746],
        zoom: 11,
      }"
      :geolocate-control="{
        show: true,
        position: 'top-left',
      }"
      @map-load="loadedPin"
      @map-click="mapClicked"
      
    />
  </div>
</template>
<script src="vue-mapbox-gl.min.js"></script>
<script>
import Mapbox from "mapbox-gl-vue";
import { mapState } from 'vuex'
import localitydata from "../assets/locality.json";
import pincode from "../assets/pincode.json";
// const parsedlocalityData = JSON.parse(localityData);
console.log(localitydata.features[0].attributes);

export default {
  name: "Assignmentpincode",
  components: { Mapbox },
  data() {
    return {
      test: 0,
      localityData: localitydata,
      // store: dataJSON
    };
  },
  mounted() {
    this.$on("toggleJSONData", this.JSONData);
  },
  computed: mapState({
    requiredData: state => state.dataJSON,
  }),
  methods: {
       loadedPin(map1) {
      // let self = this;
      //const localityData = 
      console.log({ a: this.requiredData }, "localityData");
      console.log({ state: this.requiredData }, "state log");
      const pincodeData = this.requiredData;
      const update=this.$store;
      //this.globalLayerId = 0;
      for (var i = 0; i <this.requiredData.features.length; i++) {
        var coordinatesPolygon = this.requiredData.features[i].geometry
          .rings[0];
        var idLayer = this.requiredData.features[i].attributes.FID.toString(); //'id'+[i];
        console.log({ idLayer, coordinatesPolygon });
        map1.addSource(idLayer, {
          type: "geojson",
          data: {
            type: "Feature",
            geometry: {
              type: "Polygon",
              coordinates: [coordinatesPolygon]
            }
          }
        });
        map1.addLayer({
          id: idLayer,
          type: "fill",
          source: idLayer, //required field contrary to that mentined in API docs
          //'layout': {},
          paint: {
            "fill-color": "#0000FF",
            "fill-outline-color": "#1F45FC",
            "fill-opacity": 0.2
          }
        });
        // When a click event occurs on a feature in the states layer, open a popup at the
        // location of the click, with description HTML from its properties.
        // const attrs = localityData.features[i].attributes;
        // console.log({ attrs });
        map1.on("click", idLayer, function(e) {
            new mapboxgl.Popup()
              .setLngLat(e.lngLat)
              .setHTML(
                pincodeData.features[parseInt(e.features[0].layer.id)].attributes
                  .pincode
              )
              .addTo(map1);
              update.commit("clickedPincode",pincodeData.features[parseInt(e.features[0].layer.id)].attributes
                  .pincode);
              update.commit("clickedPincodeFID",pincodeData.features[parseInt(e.features[0].layer.id)].attributes
                  .FID);
                  
          
        });
        // create DOM element for the marker
        var el = document.createElement("div");
        el.innerHTML = "Marker1";
        el.id = "marker";
        el.addEventListener("click", () => {
          alert("Marker Clicked.");
        });
        // Change the cursor to a pointer when the mouse is over the states layer.
        map1.on("mouseenter", idLayer, function() {
          map1.getCanvas().style.cursor = "pointer";
        });

        // Change it back to a pointer when it leaves.
        map1.on("mouseleave", idLayer, function() {
          map1.getCanvas().style.cursor = "";
        });
      } //end for
    },
   mapClicked() {
      //alert('Map Clicked!');
      //this.$emit("pincodeSelected");
    },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.assignment {
  display: flex;
  flex: 1;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
#map1 {
  flex: 1;

  width: 100%;
  height: 100%;
}
.mapboxgl-popup {
  max-width: 400px;
  font: 12px/20px "Helvetica Neue", Arial, Helvetica, sans-serif;
}
</style>
