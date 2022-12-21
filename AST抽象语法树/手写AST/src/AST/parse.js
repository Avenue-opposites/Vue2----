import ast from "./ast.js";
import parseAttrs from "./parseAttrs.js";
export default function(templateStr) {
    templateStr = templateStr.trim();
    const AST = [];
    const stack = [];

    const startRegExp = /^<([a-z]+[1-6]?)(\s.+)?>/i;
    const endRegExp = /^<\/([a-z]+[1-6]?)>/i;
    const wordsRegExp = /^([^\s]+)<\/[a-z]+[1-6]?>/i; 
    
    //定义指针
    let i = 0;
    let collector = AST;
    let rest = templateStr;
    while (i < templateStr.length) {
        rest = templateStr.substring(i);
        // console.log(rest);
        //判断开始标签
        if(startRegExp.test(rest)) {
            //获取开始标签
            let startTag = rest.match(startRegExp)[1];
            let attrs = rest.match(startRegExp)[2] || "";
            let attrArr = parseAttrs(attrs);
            let obj = ast(startTag,attrArr,3,"",[]);
            collector.push(obj);
            stack.push(obj);
            collector = obj.children;
            i += (startTag.length + attrs.length + 2);
        //判断结束标签
        }else if(endRegExp.test(rest)) {
            let endTag = rest.match(endRegExp)[1];
            if(endTag === stack[stack.length - 1].tag) {
                stack.pop();
                collector = stack.length > 0 ? stack[stack.length - 1].children : AST;
                // console.log(stack,AST);
            }
            i += endTag.length + 3;
        //判断是否是内容
        }else if(wordsRegExp.test(rest)) {
            let content = rest.trim().match(wordsRegExp)[1];
            stack[stack.length - 1].text = content;
            i += content.length;
        }
        else {
            i++;
        };
       
    }
    return AST.pop();
};