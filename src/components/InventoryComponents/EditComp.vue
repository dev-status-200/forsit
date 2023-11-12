<script>
  export default {
    setup(props) {
      let { value } = props.params;
      return { value };
    },
  };
</script>  
<style lang="scss" scoped></style>
<template>
    <div class="p-2">
      <router-link :to="{name:'Item', params:{id:value}}">
        <b-icon icon="pencil"></b-icon>
      </router-link>
    </div>
</template>    