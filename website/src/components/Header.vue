<template>
  <header>
    <div id="header-container-img">
      <img id="logo-header" src="@/assets/logo.png">
    </div>
    <div id="header-container">
      <div class="header-div">
        <router-link :to="{ name: 'home'}" class="common-link">
          Home
        </router-link>
      </div>
      <div class="header-div">
        <router-link :to="{ name: 'randomizer'}" class="common-link">
          Randomizer
        </router-link>
      </div>
      <div class="search-container">
        <input v-model="search" :change="getFromAPI()" type="text">
        <img src="@/assets/search-icon.svg" alt="">
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      search: '',
      cryptocurrencies: null,
      base: null
    }
  },
  methods: {
    getFromAPI() {
      this.$http
        .get('https://api.coinranking.com/v1/public/coins?prefix=' + this.search)
        .then((response) => {
          this.cryptocurrencies = response.data.data.coins
          this.base = response.data.data.base
        })
          .catch((error) => {
            console.log(error);
          });
    }
  }
}
</script>

<style lang="css" scoped>
/* Header */
header{
width: 100%;
min-width: 480px;
height: 50px;
background-color: #404040;
position: fixed;
z-index: 9999;
top: 0;
left: 0;
}

#header-container-img{
display: flex;
float: left;
height: 100%;
width: 98px;
}

#logo-header{
padding-left: 8px;
margin : auto;
width: 80%;
height: 80%;
}

#header-container{
display: flex;
justify-content: space-around;
height: 100%;
}

.header-div{
display: flex;
height: 100%;
font-family: Bahnschrift, sans-serif;
font-size: 20px;
color: #fff;
}

.header-div a{
text-decoration: none;
color: #fff;
}

.header-div span,
.header-div a{
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
  height: 20px;
  background-color: #ffffff;
  border-radius: 8px;
  border: none;
  padding-left: 25px;
}

.search-container img {
  width: 18px;
  height: 18px;
  cursor: pointer;
  position: absolute;
  left: 5px;
  top: 1px;
}

@media screen and (max-device-width:480px), screen and (max-width: 900px) {
  header{
    height: 100px;
    min-width: unset;
  }

  .header-div{
    font-size: 4vw;
  }

  #header-container-img{
    display: none;
  }

  .search-container input {
    width: 100px;
  }
}
</style>
