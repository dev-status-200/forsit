<script>
import axios from 'axios';
import { ref, watch, watchEffect } from 'vue';
import { useQuery } from '@tanstack/vue-query';
import getInsights from '../functions/getInsights';

export default {
  name:"TotalInsights",
  setup(){
    const totalOrders = ref(0)
    const totalSales = ref(0)
    const totalRevenue = ref(0)
    const getData = async() => {
      let data = await getInsights()
      totalOrders.value = data.orders
      totalSales.value = data.sales
      totalRevenue.value = data.revenue
    }
    getData();

    return {
      totalRevenue,
      totalSales,
      totalOrders
    }
  },
}
</script>
<template>
  <main>
    <div class="row">
      <div class="col-12">
        <h5 class="mb-3">Total Insights</h5>
        <div>
            <div class="row">
                <div class="col-5">
                    <div class="purple">
                        <h2>{{ totalOrders }}</h2> <p class="info">Total Orders</p>
                    </div>
                </div>
                <div class="col-1"></div>
                <div class="col-5">
                    <div class="green">
                        <h2>{{ totalSales }}</h2> <p class="info">Total Sales</p>
                    </div>
                </div>
                <div class="col-5 mt-5">
                    <div class="pink">
                        <h2>{{ (totalRevenue).toFixed(2) }}$</h2> <p class="info">Total Sales</p>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>

.flot-up{
  position: relative;
  bottom: 10px;
}
.info{
    font-size: 20px;
    font-weight: 100;
}
.purple{
    background-color: rgb(72, 72, 238);
    color: white;
    padding: 10px 20px 5px;
    border-radius: 20px;
}
.green{
    background-color: rgb(106, 201, 138);
    color: white;
    padding: 10px 20px 5px;
    border-radius: 20px;
}
.pink{
    background-color: #e91e62d8;
    color: white;
    padding: 10px 20px 5px;
    border-radius: 20px;
}
</style>