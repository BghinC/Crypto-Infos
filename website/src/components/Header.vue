<template>
  <header>
    <div id="header-container-img">
      <img id="logo-header" src="@/assets/logo.png" />
      <img
        id="menu-icon"
        src="@/assets/menu-icon.svg"
        alt=""
        @click="$emit('menu')"
      />
    </div>
    <div id="header-container">
      <div class="header-div">
        <router-link :to="{ name: 'home' }" class="common-link">
          Home
        </router-link>
      </div>
      <div class="header-div">
        <router-link :to="{ name: 'randomizer' }" class="common-link">
          Randomizer
        </router-link>
      </div>
      <div class="search-container">
        <input
          v-model="search"
          type="text"
          v-click-outside="setShowToFalse"
          v-on:click="show = true"
        />
        <img src="@/assets/search-icon.svg" alt="" class="search-icon" />
        <ul v-if="cryptocurrencies && show" class="search-list">
          <router-link
            v-for="(item, index) in cryptocurrencies"
            :key="index"
            :to="{ name: 'details', params: { id: item.id } }"
          >
            <li>
              <img :src="item.iconUrl" alt="" class="crypto-img" />
              <div class="search-list-info">
                <p>
                  <span class="crypto-name">{{ item.name }}</span>
                  <img class="change" :src="getImgChange(item.change)" />
                </p>
                <p>
                  {{ base.sign }}
                  {{ formatNumber(parseFloat(item.price).toFixed(2)) }}
                </p>
              </div>
            </li>
          </router-link>
        </ul>
      </div>
    </div>
  </header>
</template>

<script>
import ClickOutside from 'vue-click-outside';

export default {
  name: 'Header',
  data() {
    return {
      search: '',
      cryptocurrencies: null,
      base: null,
      show: false,
    };
  },
  watch: {
    search: {
      handler() {
        if (this.search.length > 0) {
          this.show = true;
          this.getFromAPI(); // call it in the context of your component object
        }
      },
      deep: true,
    },
  },
  methods: {
    getFromAPI() {
      this.$http
        .get(
          `https://api.coinranking.com/v1/public/coins?prefix=${this.search}`,
        )
        .then((response) => {
          this.cryptocurrencies = response.data.data.coins;
          this.base = response.data.data.base;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    setShowToFalse() {
      this.show = false;
    },
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
    getImgChange(change) {
      if (parseFloat(change) > 0) {
        // eslint-disable-next-line
        return require("../assets/up.png");
      }
      // eslint-disable-next-line
      return require("../assets/down.png");
    },
  },
  directives: {
    ClickOutside,
  },
};
</script>

<style lang="css" scoped>
/* Header */
header {
  width: 100%;
  min-width: 480px;
  height: 50px;
  background-color: #404040;
  position: fixed;
  z-index: 9999;
  top: 0;
  left: 0;
}

#header-container-img {
  display: flex;
  float: left;
  height: 100%;
  width: 98px;
}

#menu-icon {
  display: none;
}

#logo-header {
  padding-left: 8px;
  margin: auto;
  width: 80%;
  height: 80%;
}

#header-container {
  display: flex;
  justify-content: space-around;
  height: 100%;
}

.header-div {
  display: flex;
  height: 100%;
  font-family: Bahnschrift, sans-serif;
  font-size: 20px;
  color: #fff;
}

.header-div a {
  text-decoration: none;
  color: #fff;
}

.header-div span,
.header-div a {
  margin: auto;
  cursor: pointer;
}

.search-container {
  height: max-content;
  margin-top: auto;
  margin-bottom: auto;
  position: relative;
}

.search-container input {
  width: 150px;
  height: 22px;
  background-color: #ffffff;
  border-radius: 8px;
  border: none;
  padding-left: 25px;
}

.search-icon {
  width: 16px;
  height: 16px;
  position: absolute;
  left: 5px;
  top: 2.75px;
}

.search-list {
  position: absolute;
  height: 200px;
  width: 175px;
  overflow-y: auto;
  overflow-x: hidden;
  list-style-type: none;
  padding: 0;
  margin: 0;
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.75);
}

.search-list li {
  display: flex;
  height: 50px;
  /* background-color: rgb(255, 127, 80); */
  background-color: #ffffff;
  border-bottom: 0.5px solid #404040;
  border-top: 1px solid #404040;
}

.search-list a {
  text-decoration: none;
  color: unset;
}

.crypto-img {
  width: 25px;
  height: 25px;
  margin-left: 5px;
  margin-top: 12.5px;
}

.change {
  width: 15px;
  height: 15px;
  margin-left: 7px;
}

.search-list-info {
  margin: 5px;
}

.search-list-info p {
  margin: 0;
  display: flex;
}

.crypto-name {
  max-width: 90px;
  width: auto;
  white-space: nowrap;
  max-height: 19px;
  overflow: hidden;
  display: block;
  text-overflow: ellipsis;
}

@media screen and (max-device-width: 480px), screen and (max-width: 900px) {
  header {
    height: 100px;
    min-width: unset;
  }

  .header-div {
    font-size: 4vw;
  }

  .search-list-info {
    font-size: 13.33px;
  }

  #menu-icon {
    display: block;
    margin: auto;
    height: 40px;
    width: 40px;
    cursor: pointer;
  }

  #logo-header {
    display: none;
  }

  .search-container input {
    width: 100px;
  }

  .search-list {
    width: 125px;
  }

  .crypto-name {
    max-width: 55px;
  }

  .change {
    margin-left: 3px;
  }
}
</style>
