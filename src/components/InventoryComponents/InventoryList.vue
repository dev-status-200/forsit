<script>
  import "ag-grid-community/styles/ag-grid.css";
  import "ag-grid-community/styles/ag-theme-alpine.css";
  import { AgGridVue } from "ag-grid-vue3";
  import ImageComp from "./ImageComp.vue";
  import EditComp from "./EditComp.vue";

  export default {
    name:"InventoryList",
    components: {
      AgGridVue,
      EditComp,
      ImageComp
    },
    props:['listData'],
    setup(props){

    const getRowStyle = params => {
      if (params.data.stock < 15) {
        return { background: 'rgba(199, 92, 92, 0.58)' };
      }
    };
      return{
        props,
        columnDefs: [
          { headerName: "Name", field: "name" },
          { headerName: "Description", field: "description" },
          { headerName: "Price", field: "price" },
          { headerName: "Stock", field: "stock" },
          { headerName: "Image", field: "img", cellRenderer:"ImageComp" },
          { headerName: "Edit", field: "id", cellRenderer:"EditComp" },
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
    </div>
    <div class="row">
      <div class="col-12">
        <ag-grid-vue
          style="width: 100%; height: 75vh;"
          :rowHeight="70"
          class="ag-theme-alpine"
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
.ag-theme-alpine {
    --ag-foreground-color: rgb(39, 39, 39);
    --ag-background-color: rgb(255, 255, 255);
    --ag-header-foreground-color: rgb(255, 255, 255);
    --ag-header-background-color: rgb(30, 98, 161);
    --ag-odd-row-background-color: rgb(253, 253, 253);
    --ag-header-column-resize-handle-color: rgb(126, 46, 132);

    --ag-font-size: 16px;
}
</style>