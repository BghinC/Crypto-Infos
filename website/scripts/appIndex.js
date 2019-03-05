/* Limit of cryptocurrencies */
var limitcrypto = 10;

/* Default url */
var url = 'https://api.coinranking.com/v1/public/coins?limit=' + limitcrypto;

/* Default options */
var sortcurrency = 'USD';
var sorttimeperiod = '24h';
var sortby = 'coinranking';
var orderoption = 'desc';

var vm = new Vue({
  el: '#app',
  data: {
    cryptocurrencies: [],
    currency: ['USD','EUR','JPY','CZK','GBP','BTC','ETH'],
    timeperiod: ['24h','7d','30d'],
    sortoption: ['Coin ranking','Price','Market Cap','Change'],
    order: ['Desc', 'Asc']
  },
  methods: {
    /*
      getFromApi :: () → ()
      Get information about the first 10 (in this case) cryptocurrencies
    */
  	getFromApi: function() {
	    axios
	    .get(url)
	    .then(response => {
	      vm.cryptocurrencies = response.data.data.coins,
	      vm.base = response.data.data.base
	    })
      .catch(error => {
        console.log(error);
      })
  	},
    /*
      getFromApiOptions :: (String, String) → ()
      Get information about cryptocurrencies depending on selected options
    */
  	getFromApiOptions: (id,classe) => {
  		if(classe == 'optionCurrency'){
  			sortcurrency = id.toUpperCase();
  		}
  		else if(classe == 'optionTimePeriod'){
  			sorttimeperiod = id;
  		}
  		else if(classe == 'optionSortItem'){
  			if(id == 'marketcap'){id = 'marketCap';}
  			sortby = id;
  		}
  		url = 'https://api.coinranking.com/v1/public/coins?base=' + sortcurrency + '&timePeriod=' + sorttimeperiod + '&sort=' + sortby + '&limit=10';
  		if(classe == 'optionOrder'){
  			orderoption = id;
  		}
  		url += '&order=' + orderoption;
  		axios
	    .get(url)
	    .then(response => {
	      vm.cryptocurrencies = response.data.data.coins,
	      vm.base = response.data.data.base
	    })
      .catch(error => {
        console.log(error);
      })
  	}
  },
  created: function() {
    /* When created we get datas about the cryptocurrencies */
  	this.getFromApi();
  }
})