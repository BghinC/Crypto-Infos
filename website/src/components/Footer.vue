<template>
  <footer>
      <div class="div-footer">
        <div class="container-element-footer">
          <img id="logo-footer" src="@/assets/logo.png">
        </div>
        <div class="container-element-footer">
          <p id="what-for">
            <a href="sitemap.xml" target="_blank" class="common-link" id="sitemap-link">Sitemap</a>
          </p>
        </div>
      </div>
      <!-- / Logo + purpose div -->
      <div class="separation"></div>
      <!-- / Separation -->
      <div class="div-footer">
        <router-link :to="{ name: 'home'}" class="common-link link-map">
          Home
        </router-link>
        <router-link :to="{ name: 'randomizer'}" class="common-link link-map">
          Randomizer
        </router-link>
        <a href="mailto:clement.beghin@isen.yncrea.fr" class="common-link link-map">Contact</a>
      </div>
      <!-- / Links -->
      <div class="separation"></div>
      <!-- / Separation -->
      <div class="div-footer">
        <div class="container-element-footer">
          <img id="coinranking-logo" src="@/assets/CoinrankingLogo.png">
        </div>
        <div class="container-element-footer">
          <p>Data provided by Coinranking<br><br><a href="https://coinranking.com/" target="_blank" class="common-link">See website ></a></p>
        </div>
      </div>
      <!-- / Coinranking information -->
    </footer>
    <!-- / footer -->
</template>

<style lang="css" scoped>

</style>
