import * as Config from "../constants/Config";
import Axios from "axios";


export default function callApi(endpoint,method = "GET", data) {
    return (
        Axios({
            method: method,
            url: `${Config.API_URL}/${endpoint}`,
            // responseType: 'stream',
            contentType : 'application/json',
            data: data
        })
            .catch(err => {
                console.log(err)
            }))
}