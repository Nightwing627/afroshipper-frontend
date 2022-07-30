<template>
  <PieChart :width="width" :height="height" :chart-data="data" />
</template>

<script>
export default {
  props: {
    width: {
      type: Number,
      default: 0
    },
    height: {
      type: Number,
      default: 0
    }
  },
  computed: {
    data() {
      return {
        labels: ["Html", "Vuejs", "Laravel"],
        datasets: [
          {
            data: [15, 10, 65],
            backgroundColor: ["#FF8B26", "#FFC533", "#285FD3"],
            hoverBackgroundColor: ["#FF8B26", "#FFC533", "#285FD3"],
            borderWidth: 5,
            borderColor: this.$store.state.main.darkMode ? "#303953" : "#fff"
          }
        ]
      };
    }
  }
};
</script>
