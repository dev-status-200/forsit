<template>
  <div class="p-2">
    <img :src="value" height="50" width="50" />
  </div>
</template>
  
<script>
  export default {
    setup(props) {
      let  value  = props.params.data[`Inventory.img`];
      return { value };
    },
  };
</script>  
<style lang="scss" scoped></style>