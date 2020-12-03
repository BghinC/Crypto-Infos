<template>
  <div id="crypto">
    <Loading v-if="loading" />
    <div v-else>
      <div class="div-color" id="main-informations">
        <div id="container-crypto-color">
          <div
            id="crypto-color"
            :style="{ backgroundColor: cryptocurrency.color }"
          ></div>
        </div>
        <div id="title-container">
          <img :src="cryptocurrency.iconUrl" id="img-crypto" />
          <h1 id="crypto-title">
            {{ cryptocurrency.name }}
            <span id="symbol"> ({{ cryptocurrency.symbol }}) </span>
          </h1>
        </div>
      </div>
      <div v-if="cryptocurrency.description" class="div-color" id="description">
        <div>{{ cryptocurrency.description }}</div>
      </div>
      <div id="global-information">
        <div class="single-information">
          <p>Price:</p>
          <p v-if="cryptocurrency.change" id="single-information-change">
            <img :src="getImgChange" id="img-change" />
            <span :class="getSpanChange">{{ cryptocurrency.change }}</span>
          </p>
          <p v-if="cryptocurrency.price">
            <span>{{ base.sign }}</span>
            {{ formatNumber(parseFloat(cryptocurrency.price).toFixed(5)) }}
          </p>
        </div>
        <div v-if="cryptocurrency.volume" class="single-information">
          <p>Volume:</p>
          <p>{{ formatNumber(cryptocurrency.volume) }}</p>
        </div>
        <div v-if="cryptocurrency.marketCap" class="single-information">
          <p>Market Cap:</p>
          <p>{{ formatNumber(cryptocurrency.marketCap) }}</p>
        </div>
        <div v-if="cryptocurrency.circulatingSupply" class="single-information">
          <p>Circulating supply:</p>
          <p>{{ formatNumber(cryptocurrency.circulatingSupply) }}</p>
        </div>
        <div v-if="cryptocurrency.totalSupply" class="single-information">
          <p>Total supply:</p>
          <p>{{ formatNumber(cryptocurrency.totalSupply) }}</p>
        </div>
        <div v-if="cryptocurrency.allTimeHigh.price" class="single-information">
          <p>All time high:</p>
          <p>
            <span>{{ base.sign }}</span>
            {{
              formatNumber(
                parseFloat(cryptocurrency.allTimeHigh.price).toFixed(5)
              )
            }}
          </p>
        </div>
      </div>
      <div id="chart-container">
        <line-chart :history="history"></line-chart>
      </div>
    </div>
  </div>
</template>

<script>
import LineChart from "@/components/charts/Line.vue";
import Loading from "@/components/Loading.vue";

export default {
  name: "crypto-details",
  props: ["cryptocurrency", "base", "history", "loading"],
  components: { LineChart, Loading },
  computed: {
    /*
      getImgChange :: () → (String)
      Return the path of the image depending on the value of the stock change
    */
    getImgChange() {
      if (parseFloat(this.cryptocurrency.change) > 0) {
        // eslint-disable-next-line
        return require("../assets/up.png");
      }

      // eslint-disable-next-line
      return require("../assets/down.png");
    },
    /*
      getSpanChange :: () → (String)
      Return the class of the span depending on the value of the stock change
    */
    getSpanChange() {
      if (parseFloat(this.cryptocurrency.change) > 0) {
        return "up";
      }

      return "down";
    },
  },
  methods: {
    formatNumber(number) {
      const numbers = number.toString().split(".");
      numbers[0] += "";
      const sep = " ";
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
#crypto-detail {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 175px;
}

.div-color {
  background-color: #8e8e8e;
  margin-bottom: 10px;
}

#main-informations {
  display: flex;
}

#container-crypto-color {
  background-color: #fff;
  width: 66px;
  height: 66px;
}

#crypto-color {
  margin: auto;
  margin-top: 8px;
  width: 50px;
  height: 50px;
}

#title-container {
  display: flex;
  margin: auto;
}

#img-crypto {
  width: 50px;
  height: 50px;
}

#crypto-title {
  padding-left: 15px;
  margin-top: auto;
  margin-bottom: auto;
}

#description {
  width: 100%;
  text-align: center;
}

#global-information {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin-bottom: 10px;
}

.single-information {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: center;
  width: 13%;
  border-radius: 8px;
  background-color: #8e8e8e;
}

.single-information p {
  margin: auto;
}

#single-information-change {
  margin: 0;
}

#img-change {
  margin-left: 5px;
  height: 15px;
  width: 15px;
}

#chart-container {
  width: 100%;
}

#line-chart {
  width: 100% !important;
}

@media screen and (max-device-width: 480px), screen and (max-width: 900px) {
  .single-information {
    width: 30%;
    margin-bottom: 8px;
  }

  #invalid-id {
    padding-top: 160px;
  }

  #crypto-title {
    font-size: 5vw;
  }

  #img-crypto {
    width: 63px;
    height: 63px;
  }

  #description,
  .single-information {
    font-size: 3vw;
  }
}
</style>
