import vnodeIfy from "./vnodeIfy.js";
import createElement from "./createElement.js";
import diff from "./diff.js";
export default function (oldVnode, newVnode) {
    //如果第一个参数是不是虚拟节点
    if (!oldVnode.sel) {
        //包装成虚拟节点
        oldVnode = vnodeIfy(oldVnode);
        // console.log(oldVnode);
    };
    //判断oldVnode和newVnode是否为同一个节点
    if (oldVnode.sel === newVnode.sel && oldVnode.key === newVnode.key) {
        //diff精细比较
        // console.log("diff");
        diff(oldVnode, newVnode);

    } else {
        //暴力替换
        if (oldVnode.elm) {
            //插入新元素
            oldVnode.elm.parentNode.insertBefore(createElement(newVnode), oldVnode.elm);
            //删除旧元素
            oldVnode.elm.parentNode.removeChild(oldVnode.elm);
        }
    }
     return newVnode;
};

