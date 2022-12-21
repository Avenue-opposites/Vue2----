import h from "./Snabbdom/h.js";
import patch from "./Snabbdom/patch.js";
const container = document.getElementById("container");
let vnode = h("div",{key:"1",props:{class:"active"}},[
    h("p",{key:"A"},"A"),
    h("p",{key:"B"},"B"),
    h("p",{key:"C"},"C"),
    
]);
// const vnode = h("p",{key:1,props:{}},"我是虚拟节点");
// const newvnode = h("a",{props:{href:"https://bilibili.com"}},"B站");
let newVnode = h("div",{key:"1"},[
    h("p",{key:"D"},"D"),
    h("p",{key:"B"},"bbbbbbbbb"),
    h("p",{key:"C"},"C"),
    h("p",{key:"X"},"X"),
    h("p",{key:"Z"},"Z"),
]);
patch(container,vnode);
document.getElementById("patch").onclick = () => {
    // console.log(vnode);
    vnode = patch(vnode,newVnode);
};
