<script>
import '../assets/page.css';
import axios from 'axios';
import moment from "moment";
import { ref, watch } from 'vue';

export default {
  name:"CreateSale",
  setup(){
    let barChartData = {
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
            type: 'gradient',
            gradient: {
              colorFrom: '#D8E3F0',
              colorTo: '#BED1E6',
              stops: [0, 100],
              opacityFrom: 0.4,
              opacityTo: 0.5,
            }
          }
        },
        tooltip: {
          enabled: true,
        }
      },
      yaxis: {
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false,
        },
        labels: {
          show: false,
        }
      
      },
    }
    const chartData = ref([{
      name: 'Sales',
      data: []
    }]);
    const chartCategory = ref(barChartData);
    const selected = ref('A');
    const orderLoad = ref(false);
    const salesLoad = ref(false);
    const getData = async(option) => {
      await axios.get(import.meta.env.VITE_GET_GET_REVENUE,{
        headers:{option:option}
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
    watch(selected, (newX) => {
      orderLoad.value = true;
      getData(newX);
    })
    return {
      chartData,
      chartCategory,
      selected,
      orderLoad,
      salesLoad,
      series: [{
            name: 'series1',
            data: [31, 40, 28, 51, 42, 109, 100]
          }, {
            name: 'series2',
            data: [11, 32, 45, 32, 34, 52, 41]
      }],
      chartOptions: {
        chart: {
          height: 200,
          type: 'area',
          zoom:{
            enabled:false
          },
          toolbar:{
            show:false
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'smooth'
        },
        xaxis: {
          type: 'datetime',
          categories: ["2018-09-19T00:00:00.000Z", "2018-09-19T01:30:00.000Z", "2018-09-19T02:30:00.000Z", "2018-09-19T03:30:00.000Z", "2018-09-19T04:30:00.000Z", "2018-09-19T05:30:00.000Z", "2018-09-19T06:30:00.000Z"]
        },
        tooltip: {
          x: {
            format: 'dd/MM/yy HH:mm'
          },
        },
      },
    }
  },
}
</script>

<template>
  <main class="layout">
    <div class="row">
      <div class="col-6">
        <span class="form-check">
          <input v-model="selected" class="form-check-input cur" type="radio" name="flexRadioDefault" id="flexRadioDefault1" value="A">
          <label class="form-check-label cur" for="flexRadioDefault1">
            Last Week
          </label>
        </span>
        <span class="form-check">
          <input v-model="selected" class="form-check-input cur" type="radio" name="flexRadioDefault" id="flexRadioDefault2" value="B">
          <label class="form-check-label cur" for="flexRadioDefault2">
            Last Month
          </label>
        </span>
        <span class="form-check">
          <input v-model="selected" class="form-check-input cur" type="radio" name="flexRadioDefault" id="flexRadioDefault3" value="C">
          <label class="form-check-label cur" for="flexRadioDefault3">
            Last Year
          </label>
        </span>
        <div v-if="!orderLoad" >
          <apexchart width="100%" type="bar" :options="chartCategory" :series="chartData"></apexchart>
          <hr class="my-0 py-0 flot-up" />
          <h5 class="text-center">Orders</h5>
        </div>
        <div class="text-center mt-5" v-if="orderLoad">
          <b-spinner variant="primary" ></b-spinner>
        </div>
      </div>
      <div class="col-6">
        <div class="row">
          <div class="col-4">
            <select class="form-select" aria-label="Default select example">
              <option selected>Open this select menu</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </div>
          <div class="col-4">
            <select class="form-select" aria-label="Default select example">
              <option selected>Open this select menu</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </div>
        </div>
        <apexchart type="area" height="350" :options="chartOptions" :series="series"></apexchart>
        <hr class="my-0 py-0 flot-up" />
        <h5 class="text-center">Comparison</h5>
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