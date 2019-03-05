/* Component of the cryptocurrency displayed in the detail page */
Vue.component('crypto-detail', {
  props: ['cryptocurrency'],
  template: 
  '<div id="crypto">'+
    '<div class="div-color" id="main-informations">'+
      '<div id="container-crypto-color">'+
        '<div id="crypto-color" :style="{backgroundColor:vm.cryptocurrency.color}"></div>'+
      '</div>'+
      '<div id="title-container">'+
        '<img :src="cryptocurrency.iconUrl" id="img-crypto">'+
        '<h1 id="crypto-title">'+
          '{{cryptocurrency.name}} '+
          '<span id="symbol">'+
            '({{cryptocurrency.symbol}})'+
          '</span>'+
        '</h1>'+
      '</div>'+
    '</div>'+
    '<div class="div-color" id="description">'+
      '<div>{{cryptocurrency.description}}</div>'+
    '</div>'+
    '<div id="global-information">'+
      '<div class="single-information">'+
        '<p>'+
          'Price:'+
        '</p>'+
        '<p id="single-information-change">'+
          '<img :src="getImgChange" id="img-change">'+
          '<span :class="getSpanChange">{{cryptocurrency.change}}</span>'+
        '</p>'+
        '<p><span>{{vm.base.sign}}</span> {{formatNumber(parseFloat(cryptocurrency.price).toFixed(5))}}</p>'+
      '</div>'+
      '<div class="single-information">'+
        '<p>Volume:</p>'+
        '<p>{{formatNumber(cryptocurrency.volume)}}</p>'+
      '</div>'+
      '<div class="single-information">'+
        '<p>Market Cap:</p>'+
        '<p>{{formatNumber(cryptocurrency.marketCap)}}</p>'+
      '</div>'+
      '<div class="single-information">'+
        '<p>Circulating supply:</p>'+
        '<p>{{formatNumber(cryptocurrency.circulatingSupply)}}</p>'+
      '</div>'+
      '<div class="single-information">'+
        '<p>Total supply:</p>'+
        '<p>{{formatNumber(cryptocurrency.totalSupply)}}</p>'+
      '</div>'+
      '<div class="single-information">'+
        '<p>All time high:</p>'+
        '<p><span>{{vm.base.sign}}</span> {{formatNumber(parseFloat(cryptocurrency.allTimeHigh.price).toFixed(5))}}</p>'+
      '</div>'+
    '</div>'+
    '<div id="chart-container">'+
      '<line-chart><line-chart>'+
    '</div>'+
  '</div>',
  computed: {
    /*
      getImgChange :: () → (String)
      Return the path of the image depending on the value of the stock change
    */
    getImgChange() {
      if(parseFloat(this.cryptocurrency.change) > 0){
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
      if(parseFloat(this.cryptocurrency.change) > 0){
        return 'up';
      }
      else{
        return 'down';
      }
    }
  }
})