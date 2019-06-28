import * as Config from "../constants/Config";
import Axios from "axios";


export default function callApi(endpoint,method = "GET", data) {
    return (
        Axios({
            method: method,
            url: `${Config.API_URL}/${endpoint}`,
            //responseType: 'stream'
            data: data
        })
            .catch(err => {
                console.log(err)
            }))
}