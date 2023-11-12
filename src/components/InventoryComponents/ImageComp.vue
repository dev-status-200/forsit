<template>
  <div class="p-2">
    <img :src="value" height="50" width="50" @click="onClick" />
  </div>
</template>
  
<script>
  export default {
    setup(props) {
      let { value } = props.params;
      return { value };
    },
  };
</script>  
<style lang="scss" scoped></style>