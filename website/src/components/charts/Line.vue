<script>
import VueChartJs from 'vue-chartjs';

export default {
  name: 'LineChart',
  extends: VueChartJs.Line,
  props: {
    history: { type: Array, default: null },
  },
  methods: {
    /*
      chart :: () → ()
      Plot the chart, also used to update it
    */
    chart() {
      this.renderChart(
        {
          labels: this.getTimestamp(),
          datasets: [
            {
              label: 'Price',
              backgroundColor: ['rgba(255, 127, 80, 0.4)'],
              pointBackgroundColor: 'rgba(255, 127, 80, 0.6)',
              data: this.getPrice(),
            },
          ],
        },
        { responsive: true, maintainAspectRatio: false },
      );
    },
    /*
      getPrice :: () → [Number]
      Return an Array containing all prices
    */
    getPrice() {
      const price = [];
      for (let i = 0; i < this.history.length; i += 1) {
        price.push(this.history[i].price);
      }
      return price;
    },
    /*
      getTimestamp :: () → [String]
      Return an Array containing all timestamp to the correct format
    */
    getTimestamp() {
      const timestamp = [];
      for (let i = 0; i < this.history.length; i += 1) {
        const d = new Date(this.history[i].timestamp);
        const date = `${d.getYear() + 1900}-${
          d.getMonth() + 1
        }-${d.getDate()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
        timestamp.push(date);
      }
      return timestamp;
    },
  },
  mounted() {
    this.chart();
  },
  // updated() {
  //   this.chart();
  // },
  watch: {
    history: {
      handler() {
        this.chart();
      },
    },
  },
};
</script>
