/* Default options */
var sortcurrency = 'USD';
var sorttimeperiod = '24h';

/* Default url */
var url = 'https://api.coinranking.com/v1/public/coin/' + GET('id');
var url_history = 'https://api.coinranking.com/v1/public/coin/' + GET('id') + '/history/' + sorttimeperiod + '?base=' + sortcurrency;

/* Number of cryptocurrencies to display in "Explore" */
var nbcryptocurrencies = 3;

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
    getPrice(){
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
    getTimestamp(){
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
      Using to get an Array containing 3 random cryptocurrencies
    */
    async getRandomCoins(){
      var url_random = 'https://api.coinranking.com/v1/public/coins';
      var currency = [];
      await this.$http
      .get(url_random)
      .then(function(response) {
        currency = response.data.data.coins;
        for (var i = 0; i < nbcryptocurrencies; i++) {
          var index = Math.floor(Math.random()*currency.length);
          if(index > -1){
            var item = currency[index];
            vm.cryptocurrencies[i] = item;
            currency.splice(index, 1);
          }
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    /*
      getFromApi :: () → ()
      Get information about the selected cryptocurrency
    */
    async getFromApi(){
      /* Get the cryptocurrency history */
      await this.$http
      .get(url_history)
      .then(response => {
        vm.history = response.data.data.history
      }).catch(error => {
        /* Supress useless div */
        var element = document.getElementById('option');
        element.parentNode.removeChild(element);
        element = document.getElementById('main-container');
        element.parentNode.removeChild(element);
        element = document.getElementById('other');
        element.parentNode.removeChild(element);

        /* Display an error div */
        var p = document.getElementById('main');
        var div = document.createElement('div');
        div.setAttribute('id', 'invalid-id');
        var h = document.createElement('h1');
        h.setAttribute('id', 'invalid');
        h.innerHTML = 'Invalid id';
        p.appendChild(div);
        div.appendChild(h);
      });
      /* Get current data about the cryptocurrency */
      this.$http
      .get(url)
      .then(response => {
        vm.cryptocurrency = response.data.data.coin,
        vm.base = response.data.data.base
      }).catch(error => {
        console.log(error);
      });
    },
    /*
      getFromApiOptions :: (String, String) → ()
      Get information about the selected cryptocurrency depending on options
    */
    async getFromApiOptions(id,classe) {
      if(classe == 'optionCurrency'){
        sortcurrency = id.toUpperCase();
      }
      else if(classe == 'optionTimePeriod' ){
        sorttimeperiod = id;
      }

      /* Update items on the bottom */
      for(var i = 0; i < vm.cryptocurrencies.length; i++){
        url = 'https://api.coinranking.com/v1/public/coin/' + vm.cryptocurrencies[i].id + '?base=' + sortcurrency + '&timePeriod=' + sorttimeperiod;
        await this.$http
        .get(url)
        .then(response => {
          vm.cryptocurrencies[i] = response.data.data.coin;
        })
        .catch(error => {
          console.log(error);
        });
      }

      /* Update the main cryptocurrency */
      url_history = 'https://api.coinranking.com/v1/public/coin/' + GET('id') + '/history/' + sorttimeperiod + '?base=' + sortcurrency;
      await this.$http
      .get(url_history)
      .then(response => {
        vm.history = response.data.data.history
      })
      .catch(error => {
        console.log(error);
      });
      url = 'https://api.coinranking.com/v1/public/coin/' + GET('id') + '?base=' + sortcurrency + '&timePeriod=' + sorttimeperiod;
      await this.$http
      .get(url)
      .then(response => {
        vm.cryptocurrency = response.data.data.coin,
        vm.base = response.data.data.base
      })
      .catch(error => {
        console.log(error);
      });
    }
  },
  created: function() {
    /* When created we get datas about the main cryptocurrency and we get 3 rando cryptocurrencies to display */
    this.getFromApi();
    this.getRandomCoins();
  }
});