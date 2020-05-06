<template>
  <div class="assignment">
    <mapbox
      access-token="pk.eyJ1IjoiYW1yaXRhOTFzaW5oYSIsImEiOiJjazk2cnNtbHYwNWt5M2xtZ2Zkcnd5bzBjIn0.r-vthwmTHDI4IwUIQIlYwQ"
      :map-options="{
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [77.600072999999995,
              12.992746],
        zoom: 11,
      }"
      :geolocate-control="{
        show: true,
        position: 'top-left',
      }"
      @map-load="loaded"
      @map-click:points="clicked(e)"
      @map-mouseenter:points="mouseEntered"
      @map-mouseleave:points="mouseLeft"
    />
  </div>
</template>
<script src="vue-mapbox-gl.min.js"></script>
<script>
import Mapbox from "mapbox-gl-vue";
import localitydata from "../assets/locality.json";
import pincode from "../assets/pincode.json";
// const parsedlocalityData = JSON.parse(localityData);
console.log(localitydata.features[0].attributes);

export default {
  name: "Assignment",
  components: { Mapbox },
  data() {
    return {
      test: 0,
      localityData: localitydata,
      store: store
    };
  },
  mounted() {
    this.$on("toggleJSONData", this.JSONData);
  },
  methods: {
    JSONData(buttonID) {
      console.log("stotre" + store.state.dataJSON);
      if (buttonID == "Locality") {
        // this.localityData = localitydata;
        store.commit("localityJSONData");
      } else {
        store.commit("pincodeJSONData");
      }
    },
    loaded(map) {
      // let self = this;
      console.log({ a: this.localityData }, "localityData");
      console.log({ state: this.$root.$data }, "state log");
      const test = this.localityData;
      //this.globalLayerId = 0;
      for (var i = 0; i < this.localityData.features.length; i++) {
        var coordinatesPolygon = this.localityData.features[i].geometry
          .rings[0];
        var idLayer = this.localityData.features[i].attributes.FID.toString(); //'id'+[i];
        console.log({ idLayer, coordinatesPolygon });
        map.addSource(idLayer, {
          type: "geojson",
          data: {
            type: "Feature",
            geometry: {
              type: "Polygon",
              coordinates: [coordinatesPolygon]
            }
          }
        });
        map.addLayer({
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
        map.on("click", idLayer, function(e) {
          console.log(e);

          self.globalLayerId = e.features[0].layer.id;
          console.log(
            { test: self, test2: self.globalLayerId },
            "checking globalLayerId"
          );
          if (
            test.features[parseInt(e.features[0].layer.id)].attributes.pincode
          ) {
            new mapboxgl.Popup()
              .setLngLat(e.lngLat)
              .setHTML(
                <div>
                  pincode:
                  test.features[parseInt(e.features[0].layer.id)].attributes
                  .pincode
                </div>
              )
              .addTo(map);
          } else {
            new mapboxgl.Popup()
              .setLngLat(e.lngLat)
              .setHTML(
                test.features[parseInt(e.features[0].layer.id)].attributes
                  .population
              )
              .addTo(map);
          }
        });

        // Change the cursor to a pointer when the mouse is over the states layer.
        map.on("mouseenter", idLayer, function() {
          map.getCanvas().style.cursor = "pointer";
        });

        // Change it back to a pointer when it leaves.
        map.on("mouseleave", idLayer, function() {
          map.getCanvas().style.cursor = "";
        });
      } //end for
    },
    clicked(e) {
      this.$emit("clicked", idLayer);
    }
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
#map {
  flex: 1;

  width: 100%;
  height: 100%;
}
.mapboxgl-popup {
  max-width: 400px;
  font: 12px/20px "Helvetica Neue", Arial, Helvetica, sans-serif;
}
</style>
