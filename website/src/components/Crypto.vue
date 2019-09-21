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
    <!-- <h2>
      <router-link :to="{ name: 'details', params: {id: cryptocurrencies.id }}" class="url-crypto">
        ({{ cryptocurrencies.symbol }})
      </router-link>
    </h2> -->
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

<style scoped>

.crypto{
display: flex;
justify-content: space-between;
flex-direction: column;
padding: 5px;
margin: 0 5px;
width: 300px;
margin-bottom: 30px;
background-color: #8e8e8e;
text-align: center;
border-radius: 10px;
}

.img-crypto{
margin-left: auto;
margin-right: auto;
width: 65px;
height: 65px;
}

.crypto h1 {
  width: 100%;
}

.crypto h1 a {
  text-overflow: ellipsis;
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 100%;
  display: block;
  overflow: hidden;
}

.crypto h1,
.crypto a,
.crypto h2,
.crypto p{
width: 100%;
margin: auto;
font-family: Bahnschrift, sans-serif;
color: #fff;
margin-bottom: 5px;
}

.url-crypto{
text-decoration: none;
}

.change{
display: flex;
justify-content: center;
}

.change span {
  margin-top: auto;
  margin-bottom: auto;
}

@media screen and (max-device-width:480px), screen and (max-width: 900px) {
  .crypto{
    margin-top: 10px;
    width: 40%;
  }

  .img-crypto{
    width: 50px;
    height: 50px;
  }

  .crypto h1{
    font-size: 4vw;
  }

  .crypto h2{
    font-size: 3.5vw;
  }

  .crypto p{
    font-size: 3vw;
  }
}
</style>
