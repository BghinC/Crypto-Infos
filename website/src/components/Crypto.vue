<template>
  <div class="crypto">
    <router-link :to="{ name: 'details', params: {id: cryptocurrencies.id }}" class="url-crypto">
      <img :src="cryptocurrencies.iconUrl" class="img-crypto">
    </router-link>
    <h1>
      <router-link :to="{ name: 'details', params: {id: cryptocurrencies.id }}" class="url-crypto">
        {{ cryptocurrencies.name }}
      </router-link>
    </h1>
    <h2>
      <router-link :to="{ name: 'details', params: {id: cryptocurrencies.id }}" class="url-crypto">
        ({{ cryptocurrencies.symbol }})
      </router-link>
    </h2>
    <p class="price">
      <span>{{base.sign}}</span>
      {{formatNumber(parseFloat(cryptocurrencies.price).toFixed(5))}}
    </p>
    <p class="change">
      <img :src="getImgChange">
      <span :class="getSpanChange">{{cryptocurrencies.change}}</span>
    </p>
  </div>
</template>

<script>
export default {
  props: ['cryptocurrencies', 'base'],
  computed: {
    /*
      url :: () → (String)
      Return the url of the detail page depending on the id of the cryptocurrency
    */
    url() {
      return `details.html?id=${this.cryptocurrencies.id}`;
    },
    /*
      getImgChange :: () → (String)
      Return the path of the image depending on the value of the stock change
    */
    getImgChange() {
      if (parseFloat(this.cryptocurrencies.change) > 0) {
        // eslint-disable-next-line
        return require('../assets/up.png');
      }
      // eslint-disable-next-line
      return require('../assets/down.png');
    },
    /*
      getSpanChange :: () → (String)
      Return the class of the span depending on the value of the stock change
    */
    getSpanChange() {
      if (parseFloat(this.cryptocurrencies.change) > 0) {
        return 'up';
      }

      return 'down';
    },
  },
  methods: {
    formatNumber(number) {
      const numbers = number.toString().split('.');
      numbers[0] += '';
      const sep = ' ';
      const reg = /(\d+)(\d{3})/;
      while (reg.test(numbers[0])) {
        numbers[0] = numbers[0].replace(reg, `$1${sep}$2`);
      }
      if (numbers[1] === undefined) {
        return numbers[0];
      }

      return `${numbers[0]}.${numbers[1]}`;
    },
  },
};
</script>
