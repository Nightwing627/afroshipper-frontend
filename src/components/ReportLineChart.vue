<template>
  <LineChart
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
          labels: [],
          values: []
        };
      }
    }
  },
  data() {
    return {
      options: {
        legend: {
          display: false
        },
        scales: {
          xAxes: [
            {
              ticks: {
                fontSize: "12",
                fontColor: this.$store.state.main.darkMode
                  ? "#718096"
                  : "#777777"
              },
              gridLines: {
                display: false
              }
            }
          ],
          yAxes: [
            {
              ticks: {
                fontSize: "12",
                fontColor: this.$store.state.main.darkMode
                  ? "#718096"
                  : "#777777",
                callback: function(value) {
                  if (value > 1000)
                    value = parseInt(value / 1000).toLocaleString() + "K";
                  if (value > 1000000)
                    value = parseInt(value / 1000000).toLocaleString() + "M";
                  return "₦ " + value;
                }
              },
              gridLines: {
                color: this.$store.state.main.darkMode ? "#718096" : "#D8D8D8",
                zeroLineColor: this.$store.state.main.darkMode
                  ? "#718096"
                  : "#D8D8D8",
                borderDash: [2, 2],
                zeroLineBorderDash: [2, 2],
                drawBorder: false
              }
            }
          ]
        }
      }
    };
  },
  computed: {
    data() {
      return {
        labels: this.chartData.labels,
        datasets: [
          {
            label: "Sale",
            data: this.chartData.values,
            borderWidth: 2,
            borderColor: "#3160D8",
            backgroundColor: "transparent",
            pointBorderColor: "transparent"
          }
        ]
      };
    }
  }
};
</script>
