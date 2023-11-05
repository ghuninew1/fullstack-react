import useSWR from "swr";
import axios from "axios";

export const Request = (request, { fallbackData, ...config } = {}) => {
    return useSWR(request , () => axios(request || {}).then((response) => response.data), {
        ...config,
        fallbackData: fallbackData && {
            status: 200,
            statusText: "InitialData",
            headers: {
                "Content-Type": "application/json",
                "authtoken": localStorage.getItem("token"),
            },
            data: fallbackData,
        },
    });
};

const UseSwr = (url, config) => {
    const { data, error, isValidating, mutate } = Request(url, config);
    return {
        data,
        error,
        isValidating,
        mutate,
    };
}

export default UseSwr;