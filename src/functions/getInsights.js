import axios from "axios";

const getInsights = async() => {
    let list = await axios.get(import.meta.env.VITE_GET_GET_TOTAL_INSIGHT)
    .then((x)=>x.data.result);
    let sales = 0
    let orders = 0
    let revenue = 0
    list.forEach((x)=>{
        orders = orders + 1
        if(x.sold=='1'){
            sales = sales + 1;
            revenue = revenue + x.price
            console.log(x)
        }
    });
    return {sales, orders, revenue}
}

export default getInsights;