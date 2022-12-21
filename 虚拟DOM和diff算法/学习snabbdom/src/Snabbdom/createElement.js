//将VNode创建为dom元素并插入到第二个参数之前
export default function createElement(vnode) {
    const el = document.createElement(vnode.sel);
    const props = vnode.data.props || null;
    //如果有文本的就添加
    if (vnode.text) {
        el.innerText = vnode.text;
    }
    if(vnode.data.key) {
        el.setAttribute("key",vnode.data.key);
    }
    //如果有属性就添加
    if (props) {
        Object.keys(props).forEach(key => {
            el.setAttribute(key, props[key]);
        });

    }
    //如果有子元素,就递归添加
    if (Array.isArray(vnode.children) && vnode.children.length) {
        for (let i = 0; i < vnode.children.length; i++) {
            el.appendChild(createElement(vnode.children[i]));
        };
    }
    vnode.elm = el;
    return vnode.elm;
}