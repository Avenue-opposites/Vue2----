export default function(attrsStr) {
    let result = [];
    attrsStr = attrsStr.trim();
    if(!attrsStr) return result;
    let isCommas = false;
    let pointer = 0;
    for(let i = 0; i < attrsStr.length;i++) {
        let char = attrsStr[i];
        if(char === '"' || char === "'") {
            isCommas = !isCommas;
        }else if(char === " " && !isCommas) {
            let str = attrsStr.substring(pointer,i).trim();
            result.push(str); 
            pointer = i;
        }
    };
    result.push(attrsStr.substring(pointer).trim());
    result = result.map(el => {
        let name = el.match(/^([a-z]+)=\"(.+)\"/i)[1];
        let value = el.match(/^([a-z]+)=\"(.+)\"/i)[2];
        return {name,value};
    });
    return result;
}