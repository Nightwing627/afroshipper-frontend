<template>
  <DonutChart
    :width="width"
    :height="height"
    :chart-data="data"
    :options="options"
  />
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
        labels: ["Yellow", "Dark"],
        datasets: [
          {
            data: [15, 10, 65],
            backgroundColor: ["#FF8B26", "#FFC533", "#285FD3"],
            hoverBackgroundColor: ["#FF8B26", "#FFC533", "#285FD3"],
            borderWidth: 2,
            borderColor: this.$store.state.main.darkMode ? "#303953" : "#fff"
          }
        ]
      };
    },
    options() {
      return {
        legend: {
          display: false
        },
        cutoutPercentage: 83
      };
    }
  }
};
</script>
