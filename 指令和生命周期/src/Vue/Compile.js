import Watcher from "./responesive/Watcher.js";

//编译器类
export default class Compile {
    constructor(el, vm) {
        //绑定实例
        this.$vm = vm;
        //绑定挂载元素
        this.$el = el instanceof HTMLElement ? el : document.querySelector(el);
        //如果有这个元素
        if (this.$el) {
            //转换为fragment
            let fragment = this.node2Fragment(this.$el);
            //进行编译
            this.compile(fragment);
            this.$el.appendChild(fragment);
        }
    }
    //节点碎片
    node2Fragment(el) {
        const fragment = document.createDocumentFragment();
        let child;
        //判断是否有子节点
        while (child = el.firstChild) {
            //将元素的子节点添加到fragment中,原来元素的子节点就会删除,
            //child就会等于原先子节点的下一个,直到没有子节点为止
            fragment.appendChild(child);
        }
        return fragment;
    }
    compile(fragment) {
        const TemplateRegExp = /{{(.+)}}/i;
        const childNodes = fragment.childNodes;
        childNodes.forEach(node => {
            const text = node.textContent;
            const value = text.match(TemplateRegExp) || "";
            switch (node.nodeType) {
                case 1:
                    this.compileElement(node, value[1]);
                    break;
                case 3:
                    this.compileText(node, value[1]);
                default:
                    break;
            }
        });
    }
    //编译元素
    compileElement(node, name) {
        if (name) {
            //如果有子元素就递归
            if (node.children.length) {
                [...node.children].forEach(node => {
                    this.compileElement(node,name);
                });
            }else {
                let value = this.getVueVal(this.$vm, name);
                node.textContent = node.textContent.replace(/{{(.+)}}/i,value);
                new Watcher(this.$vm, name, (newValue) => {
                    node.textContent = node.textContent.replace(value,newValue);
                });
            }
        }
        const nodeAttrs = node.attributes;
        // console.log(nodeAttrs);
        [...nodeAttrs].forEach(attr => {
            const name = attr.name;
            const value = attr.value;
            const ownerElement = attr.ownerElement;
            if (/^v-/i.test(name)) {
                const dir = name.substring(2);
                switch (dir) {
                    case "if":
                        // console.log("v-if",ownerElement);
                        break;
                    case "show":
                        // console.log("v-show",ownerElement);
                        break;
                    case "model":
                        new Watcher(this.$vm,value,newValue => {
                            ownerElement.value = newValue;
                        });
                        let v = this.getVueVal(this.$vm,value);
                        ownerElement.value = v;
                        ownerElement.addEventListener("input",e => {
                            let newValue = e.target.value;
                            this.setVueVal(this.$vm,value,newValue);
                        });
                        break;
                    case "for":
                        // console.log("v-for",ownerElement);
                        break;
                    default:
                        break;
                }

            }
        })

    }
    compileText(node, name) {
        if (name) {
            let value = this.getVueVal(this.$vm, name);
            node.textContent = node.textContent.replace(/{{(.+)}}/i,value);
            new Watcher(this.$vm, name, (newValue) => {
                node.textContent = node.textContent.replace(value,newValue);
            });
        }
    }
    getVueVal(vue, exp) {
        let val = vue;
        exp = exp.split(".");
        exp.forEach(key => {
            val = val[key];
        });
        return val;
    }
    setVueVal(vue,exp,value) {
        let val = vue;
        exp = exp.split(".");
        exp.forEach((key,i) => {
            if(i < exp.length - 1) {
                val = val[key];
            }else {
                val[key] = value;
            }
        });
        
    }
}