import axios, {CanceledError} from "axios";

const apiClient = axios.create({
    baseURL: "http://0.0.0.0:9090/api"
});


export {CanceledError}
export default apiClient;