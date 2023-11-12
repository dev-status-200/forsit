import { ref } from "vue";
import axios from "axios";

const getChartData = (option) => {
    const data = ref([]);
    const error = ref(null);

    const fetchData = async () => {
    try {
        let fetchedData = await axios.get(import.meta.env.VITE_GET_GET_REVENUE,{
            headers:{option:option}
        })

        } catch (error) {
            error.value = error.message
        }
    }
    return { fetchData, data, error }
}

export default getChartData;