import axios from "axios";

const API_URL = "https://uaytm80pn6.execute-api.us-east-1.amazonaws.com/PROD";

export async function getCities() {
    try {
        const response = await axios.get(API_URL + "/cities");
        console.log("getting cities");
        return response.data.body;
    } catch (error) {
        console.error("Error getting cities:", error);
        return [];
    }
}

export async function getAvialableSlotsForCity(city) {
    try {
        const response = await axios.get(API_URL + "/cities/slots?city=" + city);
        console.log("getting slots");
        return response.data;
        /*
            {
                "2024-1-11": ["10", "11"]
            }
        */
    } catch (error) {
        console.error("Error getting slots:", error);
        return [];
    }
}

export async function getVideoData(cityname, date, hour) {
    try {
        const response = await axios.get(API_URL + "/video?city=" + cityname + "&date=" + date + "&hour=" + hour);
        console.log("getting video data");
        return response.data;
        /*
            {
                "images": ["url_1", "url_2", ..., "url_6"],
                "plots": ["url_1", "url_2", "url_3"]
            }
        */
    } catch (error) {
        console.error("Error getting video data:", error);
        return null;
    }
}