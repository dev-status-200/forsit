<template>
    <div class="p-2">
      <!-- <router-link :to="{name:'Item', params:{id:12}}">
        <h3>Go</h3>
      </router-link> -->
      {{ value }}
    </div>
  </template>
    
  <script>
    export default {
      setup(props) {
        let  value  = props.params.data[`Inventory.name`];
        return { value };
      },
    };
  </script>  
  <style lang="scss" scoped></style>