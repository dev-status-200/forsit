<script>
import axios from 'axios';
import moment from "moment";
import { ref, watch } from 'vue';

export default {
  name:"OrderAndInventoryChart",
  props:['color', 'name'],
  setup(props){
    let barChartData = {
      colors: [props.color],
      chart: {
        height: 250,
        type: 'bar',
        zoom:{
          enabled:false
        },
        toolbar:{
          show:false
        }
      },
      plotOptions: {
        bar: {
          borderRadius: 8,
          dataLabels: {
            position: 'top', // top, center, bottom
          },
        }
      },
      dataLabels: {
        enabled: true,
        offsetY: 20,
        style: {
          fontSize: '16px',
          colors: ["#ffffff"]
        }
      },
      xaxis: {
        categories: [],
        position: 'bottom',
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        },
        crosshairs: {
            fill: {
                colors: ['#F44336']
            }
        },
        tooltip: {
          enabled: true,
        }
      },
      yaxis: {
        axisBorder: {
          show: true
        },
        axisTicks: {
          show: true    ,
        },
        labels: {
          show: true,
        }
      },
    }
    const chartData = ref([{
      name: 'Sales',
      data: []
    }]);
    const chartCategory = ref(barChartData);
    const selectedPeriod = ref('A');
    const orderLoad = ref(false);
    const salesLoad = ref(false);
    const getData = async(option) => {
      await axios.get(import.meta.env.VITE_GET_GET_REVENUE,{
        headers:{option:option, type:props.name}
      })
      .then((x)=>{
        let data = [];
        let categories = [];
        x.data.result.forEach((x)=>{
          let date = `${moment(x.createdAt).format(option=="C"?"MMM":"MMM / DD")}`;
          if(categories.includes(date)){
            let index = categories.indexOf(date);
            data[index] = data[index] + parseInt(x.qty);
          }else{
            data.push(parseInt(x.qty));
            categories.push(date)
          }
        })
        chartCategory.value = {
          ...barChartData, 
          xaxis:{
            ...barChartData.xaxis,
            categories:categories
          }
        }
        chartData.value = [{
          name: 'Orders',
          data: data
        }];
        orderLoad.value = false 
      })
    }
    getData('A');
    watch(selectedPeriod, (periodValues) => {
      orderLoad.value = true;
      getData(periodValues);
    })
    return {
      props,
      chartData,
      chartCategory,
      selectedPeriod,
      orderLoad,
      salesLoad,
    }
  },
}
</script>
<template>
  <main>
    <div class="row">
      <div class="col-12">
        <div class="row">
            <div class="col-1"></div>
            <div class="col-3">
                <span class="form-check">
                  <input v-model="selectedPeriod" class="form-check-input cur" type="radio" :name="`${props.name}flexRadioDefault4`" :id="`${props.name}flexRadioDefault4`" value="A">
                  <label class="form-check-label cur" :for="`${props.name}flexRadioDefault4`">Last Week</label>
                </span>
            </div>
            <div class="col-3">
                <span class="form-check">
                <input v-model="selectedPeriod" class="form-check-input cur" type="radio" :name="`${props.name}flexRadioDefault5`" :id="`${props.name}flexRadioDefault5`" value="B">
                <label class="form-check-label cur" :for="`${props.name}flexRadioDefault5`">Last Month</label>
                </span>
            </div>
            <div class="col-3">
                <span class="form-check">
                <input v-model="selectedPeriod" class="form-check-input cur" type="radio" :name="`${props.name}flexRadioDefault6`" :id="`${props.name}flexRadioDefault6`" value="C">
                <label class="form-check-label cur" :for="`${props.name}flexRadioDefault6`">Last Year</label>
                </span>
            </div>
        </div>
        <div v-if="!orderLoad" >
          <apexchart width="100%" height="250" type="bar" :options="chartCategory" :series="chartData"></apexchart>
          <!-- <hr class="my-0 py-0 flot-up" /> -->
          <h5 class="text-center">{{ props.name }}</h5>
        </div>
        <div class="text-center mt-5" v-if="orderLoad" style="min-height: 250px;">
          <b-spinner variant="primary" ></b-spinner>
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

</style>