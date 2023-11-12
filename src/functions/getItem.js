import axios from "axios";

export default async function getItem (id) {
    let returnValue ={}
      await axios.get(import.meta.env.VITE_GET_ITEM, {
        headers:{id:id}
      }).then((x)=>{
          returnValue = x.data.result
      })
    return returnValue
};