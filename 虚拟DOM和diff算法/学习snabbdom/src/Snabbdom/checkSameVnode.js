import vnodeIfy from "./vnodeIfy.js";
export default function checkSameVnode(vnode1,vnode2) {
    if(vnode1 == undefined || vnode2 == undefined) {
        return false;
    }
    if(!vnode1.sel) {
        vnode1 = vnodeIfy(vnode1);
    };
    if(!vnode2.sel) {
        vnode2 = vnodeIfy(vnode2);
    };
    return vnode1.sel === vnode2.sel && vnode1.key === vnode2.key; 
};