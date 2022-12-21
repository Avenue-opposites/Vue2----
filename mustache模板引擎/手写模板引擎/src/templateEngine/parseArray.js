
import renderTemplate from "./renderTemplate.js";
export default function parseArray(token,data) {
    let str = "";
    for (let i = 0; i < data.length; i++) {
        str += renderTemplate(token,data[i]);
    };
    return str;
}