/* Default options */
var sortcurrency = 'USD';
var sorttimeperiod = '24h';

var url = '', url_history = '';

Vue.prototype.$http = axios;

var vm = new Vue({
  el: '#app',
  data: {
    cryptocurrencies: [],
    cryptocurrency: [],
    currency: ['USD','EUR','JPY','CZK','GBP','BTC','ETH'],
    timeperiod: ['24h','7d','30d','1y','5y'],
    history: [],
    base: []
  },
  methods: {
    /*
      getPrice :: () → [Number]
      Return an Array containing all prices
    */
    getPrice() {
      var price = [];
      for (var i = 0; i < vm.history.length; i++) {
        price.push(vm.history[i].price);
      }
      return price;
    },
    /*
      getTimestamp :: () → [String]
      Return an Array containing all timestamp to the correct format
    */
    getTimestamp() {
      var timestamp = [];
      for (var i = 0; i < vm.history.length; i++) {
        d = new Date((vm.history[i].timestamp));
        date = (d.getYear()+1900)+'-'+(d.getMonth()+1)+'-'+d.getDate()+' '+d.getHours()+':'+d.getMinutes()+':'+d.getSeconds();
        timestamp.push(date);
      }
      return timestamp;
    },
    /*
      getRandomCoins :: () → ()
      Return a random cryptocurrency
    */
    getRandomCoins() {
      var url_random = 'https://api.coinranking.com/v1/public/coins';
      var currency = [];
      return this.$http
      .get(url_random)
      .then(response => {
        currency = response.data.data.coins;
        var index = Math.floor(Math.random()*currency.length);
        if(index > -1){
          var item = currency[index];
          return item.id;
        }
      })
      .catch(error => {
        console.log(error);
      });
    },
    /*
      getFromApi :: () → ()
      Get information about the selected cryptocurrency
    */
    getFromApi() {
      this.getRandomCoins().then(async data => {
        url = 'https://api.coinranking.com/v1/public/coin/' + data;
        url_history = 'https://api.coinranking.com/v1/public/coin/' + data + '/history/' + sorttimeperiod + '?base=' + sortcurrency;
        await this.$http
        .get(url_history)
        .then(response => {
          vm.history = response.data.data.history
        })
        .catch(error => {
          console.log(error);
        });
        await this.$http
        .get(url)
        .then(response => {
          vm.cryptocurrency = response.data.data.coin,
          vm.base = response.data.data.base
        })
        .catch(error => {
          console.log(error);
        });
      })
      .catch(error => {
        console.log(error);
      })
    },
    /*
      getFromApiOptions :: (String, String) → ()
      Get information about the selected cryptocurrency depending on options
    */
    async getFromApiOptions(id,classe) {
      this.getRandomCoins().then(data => {
        if(classe == 'optionCurrency'){
          sortcurrency = id.toUpperCase();
        }
        else if(classe == 'optionTimePeriod'){
          sorttimeperiod = id;
        }
        url_split = url.split('?');
        url = url_split[0] +'?base=' + sortcurrency + '&timePeriod=' + sorttimeperiod;
        url_history_split = url_history.split('y');
        url_history = url_history_split[0] + 'y/' + sorttimeperiod + '?base=' + sortcurrency;

        this.$http
        .get(url_history)
        .then(response => {
          vm.history = response.data.data.history
        })
        .catch(error => {
          console.log(error);
        });

        this.$http
        .get(url)
        .then(response => {
          vm.cryptocurrency = response.data.data.coin,
          vm.base = response.data.data.base
        })
        .catch(error => {
          console.log(error);
        });
      })
      .catch(error => {
        console.log(error);
      })
    }
  },
  created: function() {
    this.getFromApi();
  }
});