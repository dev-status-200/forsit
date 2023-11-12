<script>
import '../assets/page.css';
import axios from 'axios';
import moment from "moment";
import { ref, watchEffect } from 'vue';
import OrderAndInventoryChart from "../components/OrderAndInventoryChart.vue"
import TotalInsights from "../components/TotalInsights.vue"
export default {
  name:"Analysis",
  components:{
    OrderAndInventoryChart,
    TotalInsights,
  },
  setup(){

    let tempChartData = {
      chart: { height: 200, type: 'area',
        zoom:{ enabled:false },
        toolbar:{ show:false }
      },
      dataLabels: { enabled: false},
      stroke: {curve: 'smooth'},
      xaxis: { categories: []},
      tooltip: { x: { format: 'dd/MM/yy HH:mm'} },
    }
    const chartData = ref([{name:'', data: []}, {name:'', data: []}]);
    const chartCategory = ref(tempChartData);
    const state = ref({
      empty:false,
      comparisonLoad:false
    })
    const itemOne = ref('');
    const itemTwo = ref('');
    const selected = ref('A');
    const getData = async() => {
      state.value = {...state.value, comparisonLoad:true}
      await axios.get(import.meta.env.VITE_GET_COMPARISON,{
        headers:{
          option:selected.value, 
          one:itemOne.value,
          two:itemTwo.value
        }
      })
      .then((x)=>{
        if(x.data?.result?.length>0){
          let dataOne = [];
          let dataTwo = [];
          let categories = [];
          x.data.result.forEach((x)=>{
          let date = `${moment(x.createdAt).format(selected=="C"?"MMM":"MMM / DD")}`;
          if(categories.includes(date)){
            let index = categories.indexOf(date);
            if(x.Inventory?.category==itemOne.value){
              dataOne[index] = dataOne[index] + parseInt(x.qty)
            } else {
              dataTwo[index] = dataTwo[index] + parseInt(x.qty)
            }
          } else {
            if(x.Inventory?.category==itemOne.value){
              dataOne.push(parseInt(x.qty));
              dataTwo.push(0);
            }else{
              dataTwo.push(parseInt(x.qty));
              dataOne.push(0);
            }
            categories.push(date)
          }
          })
          chartData.value = [
            {name:itemOne.value, data:dataOne},
            {name:itemTwo.value, data:dataTwo},
          ]
          chartCategory.value = { ...tempChartData, xaxis:{ categories:categories } }
          state.value = {...state.value, comparisonLoad:false}
        }else{
          state.value = {...state.value, comparisonLoad:false, empty:true}
          chartCategory.value = tempChartData;
          chartData.value = [{name:'', data: []}, {name:'', data: []}]
        }
      })
    }

    watchEffect(()=>{
      if(state.value.empty==true){
        setTimeout(()=>{
          state.value.empty = false;
        },3000)
      }
    })

    return {
      itemOne, itemTwo, selected, getData, chartCategory,  chartData,  state
    }
  }
}
</script>

<template>
  <main class="layout">
    <div class="row">
      <div class="col-6 px-4">
        <div class="shadow-box p-4">
            <TotalInsights/>
        </div>
      </div>
      <div class="col-6 px-4">
        <div class="shadow-box p-4">
            <div class="alert alert-warning alert-box" v-if="state.empty" role="alert">
              No Comparison Data Found!
            </div>
            <div class="col-12">
              <h5 class="">Item Comparison</h5>
              <div class="row">
                <div class="col-4">
                  <select class="form-select form-select-sm" aria-label="Default select example" v-model="itemOne">
                    <option value="Bags">Bags</option>
                    <option value="Shoes">Shoes</option>
                    <option value="Accessories">Accessories</option>
                    <option value="Clothes">Clothes</option>
                    <option value="Tech">Tech</option>   
                  </select>
                </div>
                <div class="col-4">
                  <select class="form-select form-select-sm" aria-label="Default select example" v-model="itemTwo">
                    <option value="Bags">Bags</option>
                    <option value="Shoes">Shoes</option>
                    <option value="Accessories">Accessories</option>
                    <option value="Clothes">Clothes</option>
                    <option value="Tech">Tech</option>  
                  </select>
                </div>
                <div class="col-12">
                  <div class="row mt-2">
                    <div class="col-3 pt-2">
                        <span class="form-check">
                        <input v-model="selected" class="form-check-input cur" type="radio" name="flexRadioDefault" id="flexRadioDefault1" value="A">
                        <label class="form-check-label cur" for="flexRadioDefault1">
                            Last Week
                        </label>
                        </span>
                    </div>
                    <div class="col-3 pt-2">
                        <span class="form-check">
                        <input v-model="selected" class="form-check-input cur" type="radio" name="flexRadioDefault" id="flexRadioDefault2" value="B">
                        <label class="form-check-label cur" for="flexRadioDefault2">
                            Last Month
                        </label>
                        </span>
                    </div>
                    <div class="col-3 pt-2">
                        <span class="form-check">
                        <input v-model="selected" class="form-check-input cur" type="radio" name="flexRadioDefault" id="flexRadioDefault3" value="C">
                        <label class="form-check-label cur" for="flexRadioDefault3">
                            Last Year
                        </label>
                        </span>
                    </div>
                    <div class="col-3">
                      <button @click="getData" class="btn btn-primary btn-sm px-4" v-if="!state.comparisonLoad">Go</button>
                      <b-spinner small  variant="primary" v-if="state.comparisonLoad"></b-spinner>
                    </div>
                  </div>
                </div>
              </div>
              <div class="">
                <apexchart type="area" height="200" :options="chartCategory" :series="chartData"></apexchart>
              </div>
            </div>
        </div>
      </div>
    </div>
    <div class="row mt-5">
        <div class="col-6 px-4">
            <OrderAndInventoryChart :color="'#E91E63'" :name="'Orders'" class="shadow-box" />
        </div>
        <div class="col-6 px-4">
            <OrderAndInventoryChart :color="'#65e687'" :name="'Sales'" class="shadow-box"  />
        </div>
    </div>
  </main>
</template>
<style scoped>
.flot-up{
  position: relative;
  bottom: 10px;
}
.alert-box{
  position: absolute; z-index: 1; width:200px; top:20px; right:43vw
}
.shadow-box{
    padding: 30px 0px 10px;
    background-color: white;
    border-radius: 25px;
    box-shadow: -1px 1px 26px -9px rgba(0,0,0,0.08);
    -webkit-box-shadow: -1px 1px 26px -9px rgba(0,0,0,0.08);
    -moz-box-shadow: -1px 1px 26px -9px rgba(0,0,0,0.08);
}
</style>