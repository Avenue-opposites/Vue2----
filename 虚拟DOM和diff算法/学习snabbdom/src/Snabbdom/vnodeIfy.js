import vnode from "./vnode.js";
export default function(element) {
    return vnode(element.tagName.toLowerCase(), { key: element.getAttribute("key") }, [...element.children], element.innerText, element)
};