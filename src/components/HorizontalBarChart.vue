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
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],
        datasets: [
          {
            label: "Html Template",
            barPercentage: 0.5,
            barThickness: 6,
            maxBarThickness: 8,
            minBarLength: 2,
            data: [0, 200, 250, 200, 500, 450, 850, 1050],
            backgroundColor: "#3160D8"
          },
          {
            label: "VueJs Template",
            barPercentage: 0.5,
            barThickness: 6,
            maxBarThickness: 8,
            minBarLength: 2,
            data: [0, 300, 400, 560, 320, 600, 720, 850],
            backgroundColor: "#BCBABA"
          }
        ]
      };
    },
    options() {
      return {
        scales: {
          xAxes: [
            {
              ticks: {
                fontSize: "12",
                fontColor: "#777777",
                callback: function(value) {
                  return "$" + value;
                }
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
                fontColor: "#777777"
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
