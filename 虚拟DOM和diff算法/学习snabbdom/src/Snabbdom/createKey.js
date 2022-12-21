export default function(vnode,beginIdx,endIdx) {
    let map = new Map();
    let key;
    for (let i = beginIdx; i <= endIdx; i++) {
        if(!vnode[i]) continue;
        key = vnode[i].key;
        if(key !== undefined) {
            map.set(key,i);
        }      
    };
    return map;
};