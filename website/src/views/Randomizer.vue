<template>
  <div>
    <Header/>
    <div id="main">
      <Menu
        :currency="currency"
        :timeperiod="timeperiod"
        v-on:update="getFromApiOptions($event)"/>
      <div id="main-container">
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
    <Footer/>
  </div>
</template>

<script>
import Header from '@/components/Header.vue';
import Menu from '@/components/Menu.vue';
import CryptoDetails from '@/components/CryptoDetails.vue';
import Footer from '@/components/Footer.vue';

export default {
  name: 'Randomizer',
  components: {
    Header, Menu, CryptoDetails, Footer,
  },
  data() {
    return {
      cryptocurrency: {},

      /* Default options */
      sortcurrency: 'USD',
      sorttimeperiod: '24h',

      url: '',
      url_history: '',

      currency: ['USD', 'EUR', 'JPY', 'CZK', 'GBP', 'BTC', 'ETH'],
      timeperiod: ['24h', '7d', '30d', '1y', '5y'],

      history: [],
      base: {},

      loadingDetails: true,
    };
  },
  created() {
    /* When created we get datas about the main cryptocurrency
    and we get 3 rando cryptocurrencies to display */
    this.getFromApi();
  },
  methods: {
    /*
      getRandomCoins :: () → ()
      Return a random cryptocurrency
    */
    getRandomCoins() {
      const urlRandom = 'https://api.coinranking.com/v1/public/coins';
      let currency = [];
      return this.$http
        .get(urlRandom)
        .then((response) => {
          currency = response.data.data.coins;
          const index = Math.floor(Math.random() * currency.length);
          if (index > -1) {
            const item = currency[index];
            return item.id;
          }
          return null;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    /*
      getFromApi :: () → ()
      Get information about the selected cryptocurrency
    */
    getFromApi() {
      this.loadingDetails = true;
      this.getRandomCoins().then(async (data) => {
        this.url = `https://api.coinranking.com/v1/public/coin/${data}`;
        this.url_history = `https://api.coinranking.com/v1/public/coin/${data}/history/${this.sorttimeperiod}?base=${this.sortcurrency}`;
        await this.$http
          .get(this.url_history)
          .then((response) => {
            this.history = response.data.data.history;
          })
          .catch((error) => {
            console.log(error);
          });
        await this.$http
          .get(this.url)
          .then((response) => {
            this.cryptocurrency = response.data.data.coin;
            this.base = response.data.data.base;
            this.loadingDetails = false;
          })
          .catch((error) => {
            console.log(error);
          });
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
      if (id === 'new') {
        this.getFromApi();
      } else {
        this.getRandomCoins().then(() => {
          if (this.currency.includes(id.toUpperCase())) {
            this.sortcurrency = id.toUpperCase();
          } else if (this.timeperiod.includes(id)) {
            this.sorttimeperiod = id;
          }
          const urlSplit = this.url.split('?');
          const url = `${urlSplit[0]}?base=${this.sortcurrency}&timePeriod=${this.sorttimeperiod}`;
          const urlHistorySplit = this.url_history.split('y');
          const urlHistory = `${urlHistorySplit[0]}y/${this.sorttimeperiod}?base=${this.sortcurrency}`;

          this.$http
            .get(urlHistory)
            .then((response) => {
              this.history = response.data.data.history;
            })
            .catch((error) => {
              console.log(error);
            });

          this.$http
            .get(url)
            .then((response) => {
              this.cryptocurrency = response.data.data.coin;
              this.base = response.data.data.base;
              this.loadingDetails = false;
            })
            .catch((error) => {
              console.log(error);
            });
        })
          .catch((error) => {
            console.log(error);
          });
      }
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
