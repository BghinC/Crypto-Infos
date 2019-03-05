/* Component corresponding to the chart */
Vue.component('line-chart', {
  extends: VueChartJs.Line,
  methods: {
    /*
      chart :: () → ()
      Plot the chart, also used to update it
    */
    chart()
    {
      this.renderChart({
        labels: vm.getTimestamp(),
        datasets: [
          {
            label: 'Price',
            backgroundColor: ['rgba(255, 127, 80, 0.4)'],
            data: vm.getPrice()
          }
        ]
      }, {responsive: true, maintainAspectRatio: false})
    }
  },
  mounted() {
    this.chart();
  },
  updated() {
    this.chart();
  }
})