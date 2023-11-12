<script setup>
import { RouterLink } from 'vue-router';
defineProps({
//   msg: {
//     type: String,
//     required: true
//   }
})
</script>

<template>
  <div class="px-5">
    <p class="link"><span class="bar-logo"></span>|<span class="me-1"></span> Forsit.</p>
    <!-- <img :src="require('../../public/profilepicbg.png')" /> -->
    <img alt="logo" src="../assets/images/logobg.png" height="60" class="user-bg"  ><br/>
    <img alt="logo" src="../assets/images/user.jpeg" height="80"  class="user" >
    <p><RouterLink class="link" to="/"><b-icon icon="house-door" class="icon"></b-icon>Home</RouterLink></p>
    <p><RouterLink class="link" to="/orders"><b-icon icon="file-text-fill" class="icon"></b-icon>Orders</RouterLink></p>
    <p><RouterLink class="link" to="/inventory"><b-icon icon="layers-fill" class="icon"></b-icon>Inventory</RouterLink></p>
    <!-- <p><RouterLink class="link" to="/analysis"><b-icon icon="bar-chart-steps" class="icon"></b-icon>Analysis</RouterLink></p> -->
  </div>
</template>

<style scoped>
.link{
    text-decoration: none;
    color: white;
}
.bar-logo{
    background-color: white;
    padding: 1px 11px;
    border-radius: 100%;
    margin-right: 10px;
    position: relative;
    top: 2px;
}
.user{
    position: relative;
    bottom: 30px;
    border-radius: 100%;
    padding: 0px;
}
.user-bg{
    opacity: 0.2;
    position: relative;
    left: 25px;
}
.icon{
  margin-right: 5px;
}
</style>
