import axios from "axios";

const getItems = () => axios.get(import.meta.env.VITE_GET_ALL_INVENTORY)
.then((x)=>x.data.result)

export default getItems;