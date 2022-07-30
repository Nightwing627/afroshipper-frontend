<template>
  <div ref="googleMap"></div>
</template>

<script>
import GoogleMapsApiLoader from "google-maps-api-loader";

export default {
  methods: {
    async initializeMap(config) {
      const google = await GoogleMapsApiLoader({
        apiKey: config.apiKey
      });
      const mapContainer = this.$refs.googleMap;
      const map = new google.maps.Map(mapContainer, config.mapConfig(google));
      return {
        map: map,
        google: google
      };
    }
  }
};
</script>
