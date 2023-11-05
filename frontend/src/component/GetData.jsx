import { useCallback } from "react";
import { useAxios } from "./useAxios.js";
import UseSwr from "./UseSwr.js";

const url = import.meta.env.VITE_API_URL;

const getAll = async () => await useAxios.get("/api/product");

const getAllRe = () => UseSwr(`${url}/api/product`);

const upload = async (data, onUploadProgress) =>
    await useAxios.post("/api/files", data, {
        headers: {
            "Content-Type": "multipart/form-data",
            Accept: "multipart/form-data",
        },
        onUploadProgress,
    });
    
const get = async (id) => await useAxios.get(`/api/product/${id}`);

const create = async (data, onUploadProgress) =>
await useAxios.post("/api/product", data, {
    headers: {
        "Content-Type": "multipart/form-data",
        Accept: "multipart/form-data",
    },
    onUploadProgress,
});

const update = async (id,data, onUploadProgress) =>
await useAxios.put(`/api/product/${id}`, data, {
    headers: {
        "Content-Type": "multipart/form-data",
        Accept: "multipart/form-data",
    },
    onUploadProgress,
});

const remove = (id) => useAxios.delete(`/api/product/${id}`);
const removeAll = () => useAxios.delete(`/api/product`);

const findIp = async (ip) => await useAxios.get(ip ? `/ip?ip=${ip}` : `/ip`);
const findPing = async (ip) => await useAxios.get(`/ping?ip=${ip}`);
const findPingRe = (ip) => UseSwr(`${url}/ping?ip=${ip}`);

const signin = async (data) => await useAxios.post("/auth/signin", data,{});
const signup = async (data) => await useAxios.post("/auth/signup", data,{});

const users = async ({ token }) => await useAxios.post("/auth/users",{},{
    headers: {
        authtoken: token,
        Accept: "application/json",
    },
})    


const GetData = () => {
    const getAllData = useCallback(async () => await getAll(), []);
    const getAllDataRe = useCallback(() => getAllRe(), []);
    const getIp = useCallback(async (ip) => await findIp(ip), []);
    const getPing = useCallback(async (ip) => await findPing(ip), []);
    const getPingRe = useCallback((ip) => findPingRe(ip), []);
    const getOne = useCallback(async (id) => await get(id), []);
    const createData = useCallback(async (data, onUploadProgress) => await create(data, onUploadProgress), []);
    const updateData = useCallback(async (id,data, onUploadProgress) => await update(id,data, onUploadProgress), []);
    const removeData = useCallback(async (id) => await remove(id), []);
    const removeAllData = useCallback(async () => await removeAll(), []);
    const uploadData = useCallback(async (data, onUploadProgress) => await upload(data, onUploadProgress), []);
    const signinData = useCallback(async (data) => await signin(data), []);
    const signupData = useCallback(async (data) => await signup(data), []);
    const curenUser = useCallback(async ({ token }) => await users({ token }), []);

    return {
        getAllData,
        getAllDataRe,
        getIp,
        getPing,
        getPingRe,
        getOne,
        createData,
        updateData,
        removeData,
        removeAllData,
        uploadData,
        signinData,
        signupData,
        curenUser,
    };
}

export default GetData;