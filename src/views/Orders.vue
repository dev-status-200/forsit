<script>
  import Order from '../components/Orders/Order.vue';
  import '../assets/page.css';
  import { useQuery } from '@tanstack/vue-query'
  import getAllOrders from '../functions/getAllOrders';

  export default {
    name:"Orders",
    components:{Order},
    setup(){
      // const { fetchData, data, error } = getInventory();
      // fetchData();
      const { isLoading, data } = useQuery({
        queryKey: ['orders'], queryFn: getAllOrders
      })
      return{
        data,
        isLoading,
      }
    },
  }
</script>

<template>
  <main class="layout">
    <div class="row">
      <div class="col=-6"><h3>Orders Page</h3></div>
      <div class="col=-6">

      </div>
    </div>
    <div v-if="error">{{error}}</div>
    <div v-if="!isLoading">
      <Order :listData="data" />
    </div>
    <div v-else>
      <b-skeleton-wrapper class="mt-5">
        <b-card>
          <b-skeleton width="85%" type="input" class="my-3"></b-skeleton>
          <b-skeleton width="55%" type="input" class="my-3"></b-skeleton>
          <b-skeleton width="70%" type="input" class="my-3"></b-skeleton>
          <b-skeleton width="85%" type="input" class="my-3"></b-skeleton>
          <b-skeleton width="55%" type="input" class="my-3"></b-skeleton>
          <b-skeleton width="70%" type="input" class="my-3"></b-skeleton>
          <b-skeleton width="85%" type="input" class="my-3"></b-skeleton>
          <b-skeleton width="55%" type="input" class="my-3"></b-skeleton>
          <b-skeleton width="70%" type="input" class="my-3"></b-skeleton>
          <b-skeleton width="85%" type="input" class="my-3"></b-skeleton>
          <b-skeleton width="55%" type="input" class="my-3"></b-skeleton>
        </b-card>
    </b-skeleton-wrapper>
    </div>
  </main>
</template>