<script>
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { AgGridVue } from "ag-grid-vue3";
import ImageComp from "./ImageComp.vue";
import ProcessComp from "./ProcessComp.vue";
import NameComp from "./NameComp.vue";
import moment from "moment";
  export default {
    name:"Order",
    components: {
      NameComp,
      AgGridVue,
      ProcessComp,
      ImageComp
    },
    props:['listData'],
    setup(props){

    const getRowStyle = params => {
      if (params.data.sold =='1') {
        return { background: 'rgba(111, 206, 114, 0.52)' };
      }
    };
      return{
        props,
        columnDefs: [
          { headerName: "Id", field: "orderId" },
          { headerName: "Quantity", field: "qty" },
          { headerName: "Price", field: "price" },
          { headerName: "Item", cellRenderer: (x) => x.data[`Inventory.name`] },
          { headerName: "Image", cellRenderer:"ImageComp" },
          { headerName: "Date", cellRenderer: (x) => moment(x.data.createdAt).format("MMM/DD") },
          { headerName: "Edit", field: "id", cellRenderer:"ProcessComp" },
        ],
        defaultColDef:{
          sortable: true,
          filter: true,
          flex: 1,
          search:true
        },
        getRowStyle
      }
    }
  }
</script>
<template>
  <main>
    <div class="row">
      <div class="col-12 text-end">
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <ag-grid-vue
          style="width: 100%; height: 80vh"
          class="ag-theme-alpine"
          :rowHeight="70"
          :columnDefs="columnDefs"
          :rowData="props.listData"
          :defaultColDef="defaultColDef"
          rowSelection="multiple"
          animateRows="true"
          @cell-clicked="cellWasClicked"
          :getRowStyle="getRowStyle"
        >
        </ag-grid-vue>
      </div>
    </div>
  </main>
</template>
<style>
</style>