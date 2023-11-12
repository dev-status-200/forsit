<script setup>
import { RouterView } from 'vue-router';
import SideBar from './components/SideBar.vue';
</script>

<template>
  <main class="container-fluid">
    <div class="row bar">
      <div class="col-2" style="padding-top: 40px;">
        <SideBar/>
      </div>
      <div class="col-10 p-0">
        <RouterView />
      </div>
    </div>
  </main>
</template>

<style scoped>
.bar{
  background-color: #646D7A;
  height: 100vh;
}
</style>
