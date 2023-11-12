<script>
import axios from 'axios';
import { ref } from 'vue';
import { useQuery } from '@tanstack/vue-query'
import getAllOrders from '../../functions/getAllOrders';
export default {
  setup(props) {
    const { refetch } = useQuery({
      queryKey: ['orders'], queryFn: getAllOrders
    })
    let { value } = props.params;
    const sold = ref(props.params.data.sold)
    const load = ref(false);
    const onClick = async(func) => {
      load.value = true;
      await axios.get(import.meta.env.VITE_GET_MARK_SOLD,{
        headers:{ id:value }
      }).then((x)=>{
        refetch();
        func();
        load.value = false;
      })
    };
    return { value, onClick, load, sold };
  },
};
</script>  
<style lang="scss" scoped></style>
<template>
  <div class="p-2">
  <b-button v-if="sold=='0'" @click="$bvModal.show('modal-scoped')" class="btn-sm btn-success" >Process</b-button>
  <div v-else class="">Done <b-icon icon="check-circle"></b-icon></div>
  <b-modal id="modal-scoped">
    <template #modal-header="{close}">
      Confirmation
    </template>
    <p>Are you sure to accept this order and sell Item?</p>
    <template #modal-footer="{ ok, cancel }">
      <div v-if="!load">
        <b-button size="sm" variant="success" class="px-3 mx-3" @click="onClick(ok)">
          Yes
        </b-button>
        <b-button size="sm" variant="danger" @click="cancel()">
          Cancel
        </b-button>
      </div>
      <div v-else>Loading...</div>
    </template>
  </b-modal>
  </div>
</template>    