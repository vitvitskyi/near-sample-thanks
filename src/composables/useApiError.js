import { ref } from "vue";

const error = ref('');

export const useApiError = () => {
    const setApiError = data => {
        error.value = data;
    }

    return {
        error,
        setApiError
    }
};