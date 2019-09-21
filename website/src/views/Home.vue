<template>
  <div>
    <Header v-on:menu="manageMenu()"/>
    <div id="main">
      <Menu
        :responsive="showMenu"
        :currency="currency"
        :timeperiod="timeperiod"
        :sortoption="sortoption"
        :order="order"
        v-on:update="getFromApiOptions($event)"/>
      <div id="container-crypto">
        <Loading id="loading" v-if="loadingCrypto" />
        <crypto
          v-else
          v-for="item in cryptocurrencies"
          v-bind:cryptocurrencies="item"
          v-bind:key="item.id"
          :base="base"/>
      </div>
      <!-- / container-crypto -->
    </div>
    <!-- / main -->
    <Footer/>
  </div>
</template>

<script>
import Header from '@/components/Header.vue';
import Menu from '@/components/Menu.vue';
import Crypto from '@/components/Crypto.vue';
import Loading from '@/components/Loading.vue';
import Footer from '@/components/Footer.vue';

/* Limit of cryptocurrencies */
const limitcrypto = 10;

/* Default url */
let url = `https://api.coinranking.com/v1/public/coins?limit=${limitcrypto}`;

export default {
  name: 'Home',
  components: {
    Header, Menu, Crypto, Loading, Footer,
  },
  data() {
    return {
      /* Default options */
      sortcurrency: 'USD',
      sorttimeperiod: '24h',
      sortby: 'coinranking',
      orderoption: 'desc',

      cryptocurrencies: [],
      currency: ['USD', 'EUR', 'JPY', 'CZK', 'GBP', 'BTC', 'ETH'],
      timeperiod: ['24h', '7d', '30d'],
      sortoption: ['Coin ranking', 'Price', 'Market Cap', 'Change'],
      order: ['Desc', 'Asc'],
      base: null,
      loadingCrypto: true,

      showMenu: false,
    };
  },
  methods: {
    /*
      getFromApi :: () → ()
      Get information about the first 10 (in this case) cryptocurrencies
    */
    getFromApi() {
      this.loadingCrypto = true;
      this.$http
        .get(url)
        .then((response) => {
          this.cryptocurrencies = response.data.data.coins,
          this.base = response.data.data.base;
          this.loadingCrypto = false;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    /*
      getFromApiOptions :: (String, String) → ()
      Get information about cryptocurrencies depending on selected options
    */
    getFromApiOptions(id) {
      this.loadingCrypto = true;
      if (this.currency.includes(id.toUpperCase())) {
        this.sortcurrency = id.toUpperCase();
      } else if (this.timeperiod.includes(id)) {
        this.sorttimeperiod = id;
      } else if (!this.order.includes(id.charAt(0).toUpperCase() + id.substring(1))) {
        if (id == 'marketcap') { id = 'marketCap'; }
        this.sortby = id;
      }
      url = `https://api.coinranking.com/v1/public/coins?base=${this.sortcurrency}&timePeriod=${this.sorttimeperiod}&sort=${this.sortby}&limit=10`;
      if (this.order.includes(id.charAt(0).toUpperCase() + id.substring(1))) {
        this.orderoption = id;
      }
      url += `&order=${this.orderoption}`;
      this.$http
        .get(url)
        .then((response) => {
          this.cryptocurrencies = response.data.data.coins;
          this.base = response.data.data.base;
          this.loadingCrypto = false;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    manageMenu() {
      this.showMenu = !this.showMenu;
    },
  },
  created() {
    /* When created we get datas about the cryptocurrencies */
    this.getFromApi();
  },
};

</script>

  <style scoped>
  #loading {
    transform: translate(0,-50%);
    right: 500px;
    left: unset;
  }

  @media screen and (max-width: 900px) {
    #loading {
      top: 25px;
      transform: translate(-50%,0);
      right: unset;
      left: 50%;
    }

    #container-crypto {
      min-height: 200px;
    }
  }
  </style>
