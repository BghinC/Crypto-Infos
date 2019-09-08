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
    </div>
  </header>
</template>

<style lang="css" scoped>
/* Header */
header{
width: 100%;
min-width: 480px;
height: 50px;
background-color: #404040;
position: fixed;
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

@media screen and (max-device-width:480px), screen and (max-width: 900px) {
  header{
    height: 150px;
    min-width: unset;
  }

  .header-div{
    font-size: 5vw;
  }

  #header-container-img{
    display: none;
  }
}
</style>
