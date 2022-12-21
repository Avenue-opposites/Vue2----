import createElement from "./createElement.js";
import updataChildren from "./updateChildren.js";
export default function diff(oldVnode,newVnode) {
    const oldProps = oldVnode.data.props || {};
    const newProps = newVnode.data.props || {};
    let oldLen = oldVnode.children.length || 0;
    let newLen = newVnode.children.length || 0;
    if(newVnode.text) {
        //判断文本节点是否一样
        if(oldVnode.text !== newVnode.text) {
            //替换文本节点
            oldVnode.elm.innerText = newVnode.text || "";
        };
    }
    //如果属性不一样就添加新的属性
    if(oldProps !== newProps) {
        Object.keys(newProps).forEach(key => {
            oldVnode.elm.setAttribute(key,newProps[key]);
        });
    };
    //如果新的虚拟节点没有子元素
    if(!newLen) {
        //清除HTML
        oldVnode.elm.innerHTML = "";
        //添加新的文本
        oldVnode.elm.innerText = newVnode.text;
    }
    //如果旧的虚拟节点没有子元素,但是新的虚拟节点有子元素
    else if(!oldLen && newLen) {
        oldVnode.elm.innerHTML = "";
        for(let i = 0; i < newLen;i++) {
            oldVnode.elm.appendChild(createElement(newVnode.children[i]));
        };
    }
    //如果旧的虚拟节点有子元素,新的虚拟节点有子元素,就将每个子元素进行diff
    else if(oldLen && newLen) {
        //更新子节点
       updataChildren(oldVnode.elm,oldVnode.children,newVnode.children);
    };
    //将新的虚拟节点的元素设置为旧虚拟的元素
    newVnode.elm = oldVnode.elm;
};