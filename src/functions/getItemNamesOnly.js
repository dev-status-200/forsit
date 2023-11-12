import { ref } from "vue";

const getItemNamesOnly = () => {
    const data = ref([]);
    const error = ref(null);

    const fetchData = async () => {
    try {
        let fetchedData = await fetch(import.meta.env.VITE_GET_ALL_ITEM_NAMES)
        if(!fetchedData.ok){
            throw Error("Some Error Occured")
        }
        let tempData = await fetchedData.json();
        data.value = tempData.result
        } catch (error) {
            error.value = error.message
        }
    }

    return { fetchData, data, error }
}

export default getItemNamesOnly;