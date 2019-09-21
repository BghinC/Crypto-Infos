<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style>
html, body{
margin: 0;
width: 100%;
}

body{
background: url('assets/background.png')
}

input {
  font-family: Bahnschrift, sans-serif;
}

.common-link:hover{
color: #FF7F50;
}

#main{
display: flex;
justify-content: space-between;
padding-top: 60px;
width: 100%;
height: 100%;
}

#option{
width: 30%;
min-width: 123px;
font-family: Bahnschrift, sans-serif;
}

#separate-option{
margin-bottom: 10px;
width: 100%;
text-align: center;
}

.option-title{
width: intrinsic;           /* Safari/WebKit uses a non-standard name */
width: -moz-max-content;    /* Firefox/Gecko */
width: -webkit-max-content; /* Chrome */
margin: auto;
color: #404040;
}

#option .sorting-option{
display: flex;
justify-content: space-around;
flex-wrap: wrap;
color: #fff;
}

.option-possibility{
width: 48%;
height: 45px;
margin: 5px 0 5px 0;
display: flex;
cursor: pointer;
}

.option-possibility{
background-color: #404040;
}

.option-possibility:hover{
background-color: #ff7f50 !important;
}

.option-possibility-span{
text-align: center;
margin: auto;
}

.up{
color: #0ad65e;
margin-left: 5px;
}

.down{
color: #f03b29;
margin-left: 5px;
}

#container-crypto{
display: flex;
flex-wrap: wrap;
justify-content: space-around;
position: relative;
}

footer{
width: 100%;
display: flex;
justify-content: space-around;
background-color: #404040;
}

.div-footer{
font-family: Bahnschrift, sans-serif;
padding-top: 15px;
padding-bottom: 15px;
width: 25%;
display: flex;
flex-direction: column;
justify-content: space-around;
color: #fff;
text-align: center;
}

.div-footer a{
text-decoration: none;
color: #fff;
}

.separation{
width: 3px;
background-color: #fff;
}

#logo-footer{
width: 150px;
height: 80px;
margin: auto;
}

#coinranking-logo{
width: 267px;
max-width: 90%;
height: 47px;
margin-left: auto;
margin-right: auto;
}

#what-for{
width: 70%;
margin: auto;
}

#sitemap-link{
text-decoration: underline;
}

.link-map{
font-size: 20px;
}


@media screen and (max-device-width:480px), screen and (max-width: 900px) {
  #main{
    flex-direction: column;
    padding-top: 100px;
  }

  #option{
    width: 100%;
  }

  .option-title{
    font-size: 4vw;
  }

  .option-possibility{
    width: 23%;
    height: 60px;
    font-size: 3vw;
  }

  footer{
    flex-direction: column;
  }

  .div-footer{
    flex-direction: unset;
    width: 100%;
    height: 100px;
  }

  .separation{
    height: 3px;
    width: unset;
    background-color: #fff;
  }

  .container-element-footer{
    width: 40%;
  }

  #what-for{
    width: 100%;
  }

  .link-map{
    margin: auto;
  }

  #coinranking-logo{
    margin-left: unset;
    margin-right: unset;
    margin-top: auto;
    margin-bottom: auto;
  }
}
</style>
