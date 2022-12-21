export default function lookup(data, keyName) {
    let temp = data;
    if(keyName !== ".") {
        keyName = keyName.split(".");
        for (let i = 0; i < keyName.length; i++) {
            temp = temp[keyName[i]];
            if(!temp) break;
        };
        temp = temp || eval(`data.${keyName}`);
    } 
    return temp;
}