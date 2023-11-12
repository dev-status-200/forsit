<script>
import InventoryList from '../components/InventoryComponents/InventoryList.vue';
import '../assets/page.css';
//   import getInventory from '../functions/getInventory';
import getItems from "../apis/getAllItems";
import { useQuery } from '@tanstack/vue-query';
export default {
    name:"Inventory",
    components:{
        InventoryList
    },
    setup(){
      // const { fetchData, data, error } = getInventory();
      // fetchData();
      const { isLoading, data } = useQuery({
        queryKey: ['posts'], queryFn: getItems
      })
      return{
        data,
        isLoading
      }
    },
}
</script>
<template>
  <main class="layout">
    <div class="row">
      <div class="col-3">
        <h3>Inventory Page</h3>
      </div>
      <div class="col-4">
        <div class="red-box"></div><div class="mx-2 note" >Indicates items with stock level less than 12</div>
      </div>
      <div class="col-5">
        <div class="col-12 text-end">
        <button class="btn btn-primary  mb-2" >
          <router-link :to="{name:'Item', params:{id:'new'}}" style="color: white; text-decoration: none;">
            Create
          </router-link>
        </button>
      </div>
      </div>
    </div>
    <div v-if="error">{{error}}</div>
    <div v-if="!isLoading">
      <InventoryList :listData="data" />
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
<style>
.red-box{
  background-color: rgb(137, 34, 34);
  height: 20px;
  width: 20px;
  margin-top: 15px;
  border-radius: 10px;
  display: inline-block;
}
.note{
  display: inline-block;
  font-weight: 600;
  position: relative;
  bottom: 5px;
}
</style>