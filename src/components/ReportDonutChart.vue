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
    },
    chartData: {
      type: Object,
      default: () => {
        return {
          shipping: 0,
          dispatch: 0,
          purchase: 0
        };
      }
    }
  },
  computed: {
    data() {
      return {
        labels: ["Shipping", "Dispatch", "Purchase"],
        datasets: [
          {
            data: [
              this.chartData.shipping,
              this.chartData.dispatch,
              this.chartData.purchase
            ],
            backgroundColor: ["#FF8B26", "#1C3FAA", "#303953"],
            hoverBackgroundColor: ["#FF8B26", "#1C3FAA", "#303953"],
            borderWidth: 5,
            borderColor: this.$store.state.main.darkMode ? "#303953" : "#fff"
          }
        ]
      };
    },
    options() {
      return {
        cutoutPercentage: 60
      };
    }
  }
};
</script>
