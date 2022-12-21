import checkSameVnode from "./checkSameVnode.js";
import createElement from "./createElement.js";
import diff from "./diff.js";
import vnodeIfy from "./vnodeIfy.js";
import createKey from "./createKey.js";
export default function updataChildren(parentElm, oldCh, newCh) {
    //如果子元素是真实dom就全部转换为虚拟dom进行比较
    if (!oldCh[0].sel) {
        oldCh = oldCh.map(child => vnodeIfy(child));
    }
    //老节点开始指针
    let oldStartIdx = 0;
    //老节点尾部指针
    let oldEndIdx = oldCh.length - 1;
    //新节点开始指针
    let newStartIdx = 0;
    //新节点尾部指针
    let newEndIdx = newCh.length - 1;
    //老节点开始元素
    let oldStartVnode = oldCh[0];
    //老节点尾部元素
    let oldEndVnode = oldCh[oldEndIdx]
    //新节点开始元素
    let newStartVnode = newCh[0];
    //新节点结束元素
    let newEndVnode = newCh[newEndIdx];
    //定义需要移动的元素
    let elmToMove = null;
    // console.log();
    //当旧节点的开始指针小于等于旧节点的尾部指针,并且新节点的开始指针小于等于新节点的尾部指针时,开始循环
    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
        //判断两个新旧的开始元素点是否相等
        if (checkSameVnode(oldStartVnode, newStartVnode)) {
            diff(oldStartVnode, newStartVnode);
            //更新旧的开始虚拟dom和指针
            oldStartVnode = oldCh[++oldStartIdx];
            //更新新的开始虚拟dom和指针
            newStartVnode = newCh[++newStartIdx];
            //判断两个新旧的尾部元素点是否相等
        } else if (checkSameVnode(oldEndVnode, newEndVnode)) {
            diff(oldEndVnode, newEndVnode);
            oldEndVnode = oldCh[--oldEndIdx];
            newEndVnode = newCh[--newEndIdx];
            //判断两个新的尾部元素和旧的开始元素是否相等
        } else if (checkSameVnode(newEndVnode, oldStartVnode)) {
            console.log("新后旧前");
            diff(oldEndVnode, newEndVnode);
            //移动节点,将旧的开始节点移动到旧的尾部节点的下一个节点之前
            parentElm.insertBefore(oldStartVnode.elm, oldEndVnode.elm.nextSibling);
            newEndVnode = newCh[--newEndIdx];
            oldStartVnode = oldCh[++oldStartIdx];
            //判断两个新的开始元素和旧的尾部元素是否相等
        } else if (checkSameVnode(newStartVnode, oldEndVnode)) {
            console.log("新前旧后");
            diff(oldEndVnode, newStartVnode);
            //移动节点,将旧的尾部节点移动到旧的开始节点的之前
            parentElm.insertBefore(oldEndVnode.elm, oldStartVnode.elm);
            oldEndVnode = oldCh[--oldEndIdx];
            newStartVnode = newCh[++newStartIdx];
        } else {
            //以上四种都没命中的情况
            let keyMap = createKey(oldCh, oldStartIdx, oldEndIdx);
            let idxInold = keyMap.get(newStartVnode.key);
            //如果在旧的中包含新的,就说明是同一个节点,就进行diff
            if (idxInold !== undefined) {
                elmToMove = oldCh[idxInold];
                diff(elmToMove, newStartVnode);
                oldCh[idxInold] = undefined;
                //如果在旧的中不包含新的旧的的可以,就说明是新的项
            } else {
                /* 这里还是有bug,不能解决一些顺序问题 */
                parentElm.insertBefore(createElement(newStartVnode),oldStartVnode.elm);
            }
            newStartVnode = newCh[++newStartIdx];
        }
    };

    //判断新的开始指针是否在尾部指针之前或者重合
    if (newStartIdx <= newEndIdx) {
        //判断新节点的尾部指针之后是否还有已处理元素,如果没有就直接插入到最后,有则插入到已处理元素之前
        const before = newCh[newEndIdx + 1] == null ? null : newCh[newEndIdx + 1].elm;
        for (let i = newStartIdx; i <= newEndIdx; i++) {
            //insertBefore方法插入在null之前则默认插入在尾部
            parentElm.insertBefore(createElement(newCh[i]), before);
        }
        //判断旧的开始指针是否在尾部指针之前或者重合
    } else if (oldStartIdx <= oldEndIdx) {
        //删除开始指针到尾部指针之间的元素
        for (let i = oldStartIdx; i <= oldEndIdx; i++) {
            if (oldCh[i]) {
                parentElm.removeChild(oldCh[i].elm);
            }
        }
    }
}