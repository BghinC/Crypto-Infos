/* Header component */
Vue.component('header-perso', {
  template: '<header>'+
      '<div id="header-container-img">'+
       '<img id="logo-header" src="res/img/logo.png">'+
      '</div>'+
      '<!-- / logo header -->'+
      '<div id="header-container">'+
        '<div class="header-div">'+
         '<a href="index.html" class="common-link">Home</a>'+
        '</div>'+
        '<div class="header-div">'+
          '<a href="randomizer.html" class="common-link">Randomizer</a>'+
        '</div>'+
      '</div>'+
      '<!-- / links -->'+
    '</header>'+
    '<!-- / header -->'
})

/* Footer component */
Vue.component('footer-perso', {
  template: '<footer>'+
      '<div class="div-footer">'+
        '<div class="container-element-footer">'+
          '<img id="logo-footer" src="./res/img/logo.png">'+
        '</div>'+
        '<div class="container-element-footer">'+
          '<p id="what-for">'+
            '<a href="sitemap.xml" target="_blank" class="common-link" id="sitemap-link">Sitemap</a>'+
          '</p>'+
        '</div>'+
      '</div>'+
      '<!-- / Logo + purpose div -->'+
      '<div class="separation"></div>'+
      '<!-- / Separation -->'+
      '<div class="div-footer">'+
        '<a href="index.html" class="common-link link-map">Home</a>'+
        '<a href="randomizer.html" class="common-link link-map">Randomizer</a>'+
        '<a href="mailto:clement.beghin@isen.yncrea.fr" class="common-link link-map">Contact</a>'+
      '</div>'+
      '<!-- / Links -->'+
      '<div class="separation"></div>'+
      '<!-- / Separation -->'+
      '<div class="div-footer">'+
        '<div class="container-element-footer">'+
          '<img id="coinranking-logo" src="./res/img/CoinrankingLogo.png">'+
        '</div>'+
        '<div class="container-element-footer">'+
          '<p>Data provided by Coinranking<br><br><a href="https://coinranking.com/" target="_blank" class="common-link">See website ></a></p>'+
        '</div>'+
      '</div>'+
      '<!-- / Coinranking information -->'+
    '</footer>'+
    '<!-- / footer -->'
})

/* Components for the options */

Vue.component('sortingoptioncurrency', {
  props: ['currency'],
  template: '<div class="optionCurrency option-possibility" :id="currency" @click="changeBackground(currency,\'optionCurrency\')">'+
      '<span class="option-possibility-span">'+
        '{{ currency }}'+
      '</span>'+
    '</div>',
  mounted: function() {
  	document.getElementsByClassName('optionCurrency')[0].style.backgroundColor="#FF7F50";
  }
})

Vue.component('sortingoptiontimeperiod', {
  props: ['timeperiod'],
  template: '<div class="optionTimePeriod option-possibility" :id="timeperiod" @click="changeBackground(timeperiod,\'optionTimePeriod\')">'+
      '<span class="option-possibility-span">'+
        '{{ timeperiod }}'+
      '</span>'+
    '</div>',
  mounted: function() {
  	document.getElementsByClassName('optionTimePeriod')[0].style.backgroundColor="#FF7F50";
  }
})

Vue.component('sortingoptionsortitem', {
  props: ['sortoption'],
  template: '<div class="optionSortItem option-possibility" :id="sortoption" @click="changeBackground(sortoption,\'optionSortItem\')">'+
      '<span class="option-possibility-span">'+
        '{{ sortoption }}'+
      '</span>'+
    '</div>',
  mounted: function() {
  	document.getElementsByClassName('optionSortItem')[0].style.backgroundColor="#FF7F50";
  }
})

Vue.component('sortingoptionorder', {
  props: ['order'],
  template: '<div class="optionOrder option-possibility" :id="order" @click="changeBackground(order,\'optionOrder\')">'+
      '<span class="option-possibility-span">'+
        '{{ order }}'+
      '</span>'+
    '</div>',
  mounted: function() {
  	document.getElementsByClassName('optionOrder')[0].style.backgroundColor="#FF7F50";
  }
})

/* Component corresponding to a display an unique crypto */
Vue.component('crypto', {
  props: ['cryptocurrencies'],
  template: 
  '<div class="crypto">'+
    '<a :href="url" class="url-crypto"><img :src="cryptocurrencies.iconUrl" class="img-crypto"></a>'+
    '<h1>'+
      '<a :href="url" class="url-crypto">{{ cryptocurrencies.name }}</a>'+
    '</h1>'+
    '<h2><a :href="url" class="url-crypto">({{ cryptocurrencies.symbol }})</h2></a>'+
    '<p class=price>'+
      '<span>{{vm.base.sign}}</span>'+
      '{{formatNumber(parseFloat(cryptocurrencies.price).toFixed(5))}}'+
    '</p>'+
    '<p class="change">'+
      '<img :src="getImgChange">'+
      '<span :class="getSpanChange">{{cryptocurrencies.change}}</span>'+
    '</p>'+
  '</div>',
  computed: {
    /* 
      url :: () → (String)
      Return the url of the detail page depending on the id of the cryptocurrency
    */
    url() {
      return 'details.html?id=' + this.cryptocurrencies.id;
    },
    /*
      getImgChange :: () → (String)
      Return the path of the image depending on the value of the stock change
    */
    getImgChange() {
      if(parseFloat(this.cryptocurrencies.change) > 0){
        return './res/img/up.png';
      }
      else{
        return './res/img/down.png';
      }
    },
    /*
      getSpanChange :: () → (String)
      Return the class of the span depending on the value of the stock change
    */
    getSpanChange() {
      if(parseFloat(this.cryptocurrencies.change) > 0){
        return 'up';
      }
      else{
        return 'down';
      }
    }
  }
})