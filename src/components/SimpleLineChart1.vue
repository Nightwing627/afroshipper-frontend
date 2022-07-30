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
    lineColor: {
      type: String,
      default: ""
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
            label: "# of Votes",
            data: [0, 200, 250, 200, 500, 450, 850, 1050, 950, 1100, 900, 1200],
            borderWidth: 2,
            borderColor: this.lineColor.length ? this.lineColor : "#3160D8",
            backgroundColor: "transparent",
            pointBorderColor: "transparent"
          }
        ]
      };
    },
    options() {
      return {
        maintainAspectRatio: false,
        legend: {
          display: false
        },
        scales: {
          xAxes: [
            {
              ticks: {
                display: false
              },
              gridLines: {
                display: false
              }
            }
          ],
          yAxes: [
            {
              ticks: {
                display: false
              },
              gridLines: {
                display: false
              }
            }
          ]
        }
      };
    }
  }
};
</script>
