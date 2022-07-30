<template>
  <BarChart
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
        labels: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec"
        ],
        datasets: [
          {
            label: "Html Template",
            barPercentage: 0.5,
            barThickness: 6,
            maxBarThickness: 8,
            minBarLength: 2,
            backgroundColor: "#3160D8",
            data: this.$h.randomNumbers(-100, 100, 12)
          },
          {
            label: "VueJs Template",
            barPercentage: 0.5,
            barThickness: 6,
            maxBarThickness: 8,
            minBarLength: 2,
            backgroundColor: "#BCBABA",
            data: this.$h.randomNumbers(-100, 100, 12)
          }
        ]
      };
    },
    options() {
      return {
        scales: {
          xAxes: [
            {
              stacked: true,
              ticks: {
                fontSize: "12",
                fontColor: "#777777"
              },
              gridLines: {
                display: false
              }
            }
          ],
          yAxes: [
            {
              stacked: true,
              ticks: {
                fontSize: "12",
                fontColor: "#777777",
                callback: function(value) {
                  return "$" + value;
                }
              },
              gridLines: {
                color: "#D8D8D8",
                zeroLineColor: "#D8D8D8",
                borderDash: [2, 2],
                zeroLineBorderDash: [2, 2],
                drawBorder: false
              }
            }
          ]
        }
      };
    }
  }
};
</script>
