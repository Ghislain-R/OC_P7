
<template>
  <div id="app">
    
    <header>
        <img src="./assets/logo.png" id="logo" alt="Logo de la société Groupomania" />
    </header>
    <router-view></router-view>
    
</div>  
</template>

<script>

</script>

<style lang="scss">

/*@import url('https://fonts.googleapis.com/css2?family=Roboto+Condensed&display=swap');*/
@import url('https://fonts.googleapis.com/css2?family=Titillium+Web&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Kreon&family=Titillium+Web&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Roboto+Condensed&family=Titillium+Web&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Raleway:wght@500&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400&display=swap');


body, html {
  margin: 0;
  padding: 0;
  height: 100%; 
}
#app {
  height: 100%;
  font-family: 'Roboto', sans-serif;
  /*font-family: 'Raleway', sans-serif;*/
  /*font-family: 'Titillium Web', sans-serif;*/
  /*font-family: 'Kreon', serif;*/
  /*font-family: 'Roboto Condensed', sans-serif;*/
}
header {
  background-size: cover;
  width: 100%;
  height: 100px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  color: white;
  border-bottom: 6px solid #f82841;
  font-size: 1.25em;
  display: flex;
  flex-direction: row;
}
header a{
  text-decoration: none;
  color: white;
  margin: auto;
}
header img {
  width: 22%;
  margin: auto;
}

@media screen and (max-width: 1270px) {
  header img {
    width: 35%;
  }
}
@media screen and (max-width: 768px) {
  header img {
    width: 35%;
  }
}
@media screen and (max-width: 600px) {
  header img {
    width: 50%;
  }
}
/*@media screen and (max-width: 450px) {
  header img {
    width: 50%;
  }
}*/
</style>
