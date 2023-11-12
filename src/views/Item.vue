<script>
import { ref } from 'vue';
import { reset } from '@formkit/core';
import axios from "axios";
import router from '../router';
import { useQuery } from '@tanstack/vue-query'
import getItems from "../apis/getAllItems"
import uploadImage from '../functions/uploadImage';
import getItem from "../functions/getItem"

export default {
  name:"Item",
  props:['id'],
  setup(props){
    const { refetch } = useQuery({ queryKey: ['posts'], queryFn: getItems });
    
    const image = ref("");
    const load = ref(props.id=='new'?false:true);

    const resetForm = (data) => { 
      load.value = false; 
      reset("myForm", {...data}) 
    }

    const getItemData = async() => {
      let value = await getItem(props.id);
      resetForm(value);
      image.value = value.img
    }
    props.id!='new'?getItemData():null;
    
    const handleSubmit = async (fields) => {
      load.value = true;
      let body = {...fields, img:image.value!=''?image.value:await uploadImage(fields.img[0].file)}
      axios.post(import.meta.env.VITE_CREATE_ITEM, body)
      .then((x)=>{
        router.replace({ path: `/item/${x.data.result[0].id}` })
        image.value = x.data.result[0].img
        load.value = false;
        refetch();
      })
    };

    return{
      handleSubmit,
      resetForm,
      image,
      load
    }
  }
}
</script>

<template>
  <main class="layout">
    <b-overlay :show="load" rounded="sm">
      <h4>Create Item</h4>
      <hr/>
      <div class="row">
        <div class="col-5">
          <FormKit type="form" @submit="handleSubmit" #default="{value}" ref="picture" id="myForm">
          <FormKit
            type="text"
            name="name"
            label="Name"
            placeholder="Enter Item Name"
            validation="required|text"
          />
          <div class="row">
            <div class="col-4">
              <FormKit
              class="mt-2 mb-3"
                name="price"
                label="Price"
                step="0.01"
                type="number"
                value="0.0"
                validation="required|number|min:1.00"
              />
            </div>
            <div class="col-4">
              <FormKit
              class="mt-2 mb-3"
                type="number"
                name="stock"
                value="0"
                number="integer"
                step="1"
                label="Stock"
                placeholder="Enter Item Stock"
                validation="required|number|min:1"
              />
            </div>
            <div class="col-4">
                <FormKit
                  class="mt-2 mb-3"
                  type="select"
                  label="Select Category"
                  name="category"
                  :options="[
                    'Bags'        ,
                    'Shoes'       ,
                    'Accessories' ,
                    'Clothes'     ,
                    'Tech'        ,
                  ]"
                  validation="required"
                />
              </div>
          </div>
            <FormKit
              class="mt-3"
              type="textarea"
              name="description"
              label="Description"
              rows="2"
              cols="30"
              placeholder="Remember to write in complete sentences."
              validation="required|text"
            />
            <div class="row">
              <div class="col-12">
                <FormKit
                  v-if="!image"
                  class="mt-2 mb-3"
                  type="file"
                  name="img"
                  label="Image"
                  validation="required"
                  id="upload-photo"
                />
              </div>

            </div>
        </FormKit>
        </div>
        <div class="col px-4 mx-2" style="border-left: 1px solid silver;">
          <div v-if="image!=''">
              <span class="cur mt-2" @click="image = ''">
                  <b-icon icon="x-circle"></b-icon> Remove<br/> 
              </span>
              <img :src="image" class="my-2"  style="width: 60%; height: 60%; padding: 10px; border:1px solid silver;" />
            </div>
        </div>
      </div>
      <p><em><small>Press submit to see the collected form data.</small></em></p> 
    </b-overlay>
  </main>
</template>
<style>

  [data-invalid] .formkit-input {
    transition-duration: 300ms;
    border-color: red;
    box-shadow: 0 0 0 1px red;
  }
  .formkit-input {
    transition-duration: 300ms;
    width: 100%;
    border: 1px solid grey;
    border-radius: 5px;
    padding: 5px;
  }
  .formkit-file-remove:before{
    content: "";
  }
  .formkit-file-remove{
    background-color: rgb(250, 96, 96);
    border: none;
    color: white;
    padding: 5px;
    border-radius: 5px;
    margin-left: 10px;
  }
</style>