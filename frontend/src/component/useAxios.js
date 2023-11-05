import axios from "axios";

export const useAxios = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        "Content-type": "application/json",
        "Accept": "application/json",
    }
});

// useAxios.interceptors.request.use(
//     (request)=>{
//         // request.time = { start: Date.now() };
//         return request;
//     },
//     (error) => {
//         return Promise.reject(error);
//     }
// );

// useAxios.interceptors.response.use(
//     (response) => {
//         // response.config.time.end = Date.now();
//         // response.duration = response.config.time.end - response.config.time.start;
//         return response;
//     },
//     (error) => {
//         // if (error.response.status === 401 || error.response.status === 403) {
//         //     console.log("error", error.response.status);
//         //     window.location.href = "/login";
//         // }
//         if (error.response.status === 400) {
//             alert(error.response.data);
//             console.log("error", error.response.data);
//         }
//         return Promise.reject(error);
//     }
// );
