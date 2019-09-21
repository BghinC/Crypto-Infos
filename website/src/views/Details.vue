<template>
  <div>
    <Header v-on:menu="manageMenu()"/>
    <div id="main">
      <div v-if="error" id="invalid-id">
        <h1 id="invalid">
          Invalid id
        </h1>
      </div>
      <Menu
        v-if="!error"
        :responsive="showMenu"
        :currency="currency"
        :timeperiod="timeperiod"
        v-on:update="getFromApiOptions($event)"/>
      <div v-if="!error" id="main-container">
        <crypto-details
            id="crypto-detail"
            v-if="history && cryptocurrency.allTimeHigh"
            :history="history"
            :cryptocurrency="cryptocurrency"
            :base="base"
            :loading="loadingDetails">
          </crypto-details>
      </div>
      <!-- / main-container -->
    </div>
    <!-- / main -->
    <div v-if="!error" id="other">
      <h1 id="other-title">Explore others cryptocurrencies</h1>
        <Loading v-if="loadingCrypto" class="loading-crypto" />
        <div id="container-crypto" v-else>
          <crypto v-for="item in cryptocurrencies" v-bind:cryptocurrencies="item" v-bind:key="item.id" :base="base"></crypto>
        </div>
    </div>
    <!-- / Other -->
    <Footer/>
  </div>
</template>

<script>
import Header from '@/components/Header.vue';
import Menu from '@/components/Menu.vue';
import Crypto from '@/components/Crypto.vue';
import CryptoDetails from '@/components/CryptoDetails.vue';
import Loading from '@/components/Loading.vue';
import Footer from '@/components/Footer.vue';

export default {
  name: 'Details',
  components: {
    Header, Menu, CryptoDetails, Crypto, Footer, Loading,
  },
  data() {
    return {
      cryptocurrencies: [],
      cryptocurrency: {},

      /* Default options */
      sortcurrency: 'USD',
      sorttimeperiod: '24h',

      url: `https://api.coinranking.com/v1/public/coin/${this.$route.params.id}`,
      url_history: `https://api.coinranking.com/v1/public/coin/${this.$route.params.id}/history/24h?base=USD`,

      currency: ['USD', 'EUR', 'JPY', 'CZK', 'GBP', 'BTC', 'ETH'],
      timeperiod: ['24h', '7d', '30d', '1y', '5y'],

      history: [],
      base: {},

      loadingDetails: true,
      loadingCrypto: true,

      error: false,

      showMenu: false,
    };
  },
  watch: {
    '$route.params.id': {
      handler() {
        this.error = false;
        this.url = `https://api.coinranking.com/v1/public/coin/${this.$route.params.id}`;
        this.url_history = `https://api.coinranking.com/v1/public/coin/${this.$route.params.id}/history/24h?base=USD`;
        this.getFromApiOptions(null);
        this.getRandomCoins();
      },
    },
  },
  created() {
    /* When created we get datas about the main cryptocurrency and we get 3 rando cryptocurrencies to display */
    this.getFromApi();
    this.getRandomCoins();
  },
  methods: {
    async getFromApi() {
      this.loadingDetails = true;
      /* Get the cryptocurrency history */
      await this.$http
        .get(this.url_history)
        .then((response) => {
          this.history = response.data.data.history;
        }).catch((error) => {
        /* Supress useless div */
          this.error = true;
        });
      /* Get current data about the cryptocurrency */
      this.$http
        .get(this.url)
        .then((response) => {
          this.cryptocurrency = response.data.data.coin;
          this.base = response.data.data.base;
          this.loadingDetails = false;
        }).catch((error) => {
          console.log(error);
        });
    },
    /*
      getRandomCoins :: () → ()
      Using to get an Array containing 3 random cryptocurrencies
    */
    async getRandomCoins() {
      this.loadingCrypto = true;
      const self = this;
      const url_random = 'https://api.coinranking.com/v1/public/coins';
      let currency = [];
      await this.$http
        .get(url_random)
        .then((response) => {
          currency = response.data.data.coins;
          for (let i = 0; i < 3; i += 1) {
            const index = Math.floor(Math.random() * currency.length);
            if (index > -1) {
              const item = currency[index];
              self.cryptocurrencies[i] = item;
              currency.splice(index, 1);
            }
          }
          this.loadingCrypto = false;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    /*
      getFromApiOptions :: (String, String) → ()
      Get information about the selected cryptocurrency depending on options
    */
    async getFromApiOptions(id) {
      this.loadingDetails = true;
      if (id !== null && this.currency.includes(id.toUpperCase())) {
  			this.sortcurrency = id.toUpperCase();
  		} else if (this.timeperiod.includes(id)) {
  			this.sorttimeperiod = id;
  		}

      /* Update items on the bottom */
      this.loadingCrypto = true;
      for (var i = 0; i < this.cryptocurrencies.length; i++) {
        var url = `https://api.coinranking.com/v1/public/coin/${this.cryptocurrencies[i].id}?base=${this.sortcurrency}&timePeriod=${this.sorttimeperiod}`;
        await this.$http
          // eslint-disable-next-line
          .get(url)
          .then((response) => {
            this.cryptocurrencies[i] = response.data.data.coin;
          })
          .catch((error) => {
            console.log(error);
          });
      }
      this.loadingCrypto = false;

      /* Update the main cryptocurrency */
      const url_history = `https://api.coinranking.com/v1/public/coin/${this.$route.params.id}/history/${this.sorttimeperiod}?base=${this.sortcurrency}`;
      await this.$http
        .get(url_history)
        .then((response) => {
          this.history = response.data.data.history;
        })
        .catch((error) => {
          console.log(error);
        });
      // eslint-disable-next-line
      url = `https://api.coinranking.com/v1/public/coin/${this.$route.params.id}?base=${this.sortcurrency}&timePeriod=${this.sorttimeperiod}`;
      await this.$http
        // eslint-disable-next-line
        .get(url)
        .then((response) => {
          this.cryptocurrency = response.data.data.coin;
          this.base = response.data.data.base;
        })
        .catch((error) => {
          console.log(error);
        });
      this.loadingDetails = false;
    },
    manageMenu() {
      this.showMenu = !this.showMenu
    },
  },
};

</script>

<style scoped>
/*
  Details
*/
#option{
  width: 15%;
}

#main-container{
  padding-left: 30px;
  padding-right: 30px;
  font-family: Bahnschrift, sans-serif;
  color: #fff;
  width: 100%;
}

#other{
  font-family: Bahnschrift, sans-serif;
  position: relative;
  min-height: 175px;
}

.loading-crypto {
  bottom: 0;
  top: unset;
  transform: translate(-50%,0);
}

#other-title{
  margin: auto;
  text-align: center;
  margin-bottom: 10px;
}

#invalid-id{
  font-family: Bahnschrift, sans-serif;
  padding-top: 60px;
  padding-bottom: 60px;
  margin: auto;
  text-align: center;
  color: red;
}

@media screen and (max-device-width:480px), screen and (max-width: 900px) {
  #main-container{
    padding-left: 5px;
    padding-right: 5px;
    width: unset;
  }

  #option{
    width: 100%;
  }

  .single-information{
    width: 30%;
    margin-bottom: 8px;
  }

  #invalid-id{
    padding-top: 160px;
  }

  #crypto-title{
    font-size: 5vw;
  }

  #img-crypto{
    width: 63px;
    height: 63px;
  }

  #description, .single-information{
    font-size: 3vw;
  }

  #img-change{
    width: 30px;
    height: 30px;
  }
}
</style>
