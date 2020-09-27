import axios from "axios";
export const apiURL = "https://learnvocab.herokuapp.com";

const api = axios.create({
    baseURL: `${apiURL}/api`,
});

api.interceptors.request.use(function (config) {
    const accessToken = localStorage.getItem("accessToken");
    config.headers.access_token = accessToken ? accessToken : "";
    config["Content-Type"] = "application/json";
    return config;
});

const BaseAPI = (prefixOfEndpoint) => {
    return {
        async get(suffixOfEndpoint) {
            try {
                const res = await api.get(`/${prefixOfEndpoint}/${suffixOfEndpoint}`);
                return res;
            } catch (error) {
                return error.response;
            }
        },

        async post(suffixOfEndpoint, body, contentType) {
            try {
                const res = await api.post(
                    `/${prefixOfEndpoint}/${suffixOfEndpoint}`,
                    body,
                    contentType === "formData" && { headers: { "content-type": "multipart/form-data" } }
                );
                return res;
            } catch (error) {
                return error.response;
            }
        },
        async put(suffixOfEndpoint, body) {
            try {
                const res = await api.put(`/${prefixOfEndpoint}/${suffixOfEndpoint}`, body);
                return res;
            } catch (error) {
                return error.response;
            }
        },
        async patch(suffixOfEndpoint, body) {
            try {
                const res = await api.patch(`/${prefixOfEndpoint}/${suffixOfEndpoint}`, body);
                return res;
            } catch (error) {
                return error.response;
            }
        },
        async delete(suffixOfEndpoint) {
            try {
                const res = await api.delete(`/${prefixOfEndpoint}/${suffixOfEndpoint}`);
                return res;
            } catch (error) {
                return error;
            }
        },
    };
};

export default BaseAPI;
