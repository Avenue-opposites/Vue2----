import lookup from "./lookup.js";
import parseArray from './parseArray';
/* 功能让tokens数组变成dom字符串 */ 
export default function renderTemplate(tokens,data) {
    let innerHTML = "";
    let token;
    for (let i = 0; i < tokens.length; i++) {
        token = tokens[i];
        switch (token[0]) {
            case "name":
                innerHTML += lookup(data,token[1]);
                break;
            case "#":
                innerHTML += parseArray(token[2],data[token[1]]);
                break;
            default:
                innerHTML += token[1];
                break;
        }
        
    }
    return innerHTML;
}