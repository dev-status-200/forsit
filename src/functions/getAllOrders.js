import axios from "axios";

const getAllOrders = () => axios.get(import.meta.env.VITE_GET_GET_ALL_ORDERS)
.then((x)=>x.data.result)

export default getAllOrders;