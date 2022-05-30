import axios from "axios";

export default axios.create({
    baseURL: "http://admin.ommo.loc/wp-json/",
    responseType: "json"
});