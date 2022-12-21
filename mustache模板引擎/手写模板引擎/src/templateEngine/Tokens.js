import Scanner from "./Scanner.js";
import nest from "./Nest.js";
export default function Tokens(templateStr) {
    const tokens = [];
    /* 实例化扫描器 */
    const scanner = new Scanner(templateStr);
    //声明变量接收字符
    let words;
    //如果有尾巴就获取字符
    while (!scanner.eos()) {
        //收集{{前的字符
        words = scanner.scanUntil("{{");
        words && tokens.push(["text",words]);
        scanner.scan("{{");

        //收集}}前的字符
        words = scanner.scanUntil("}}");
        //如果为变量首位为#就当做循环体处理
        if(words[0] === "#" ) {
            tokens.push(["#",words.substring(1)]);
        }else if(words[0] === "/") {
            tokens.push(["/",words.substring(1)]);
        }else {
            words && tokens.push(["name",words]);
        }
        scanner.scan("}}");
    };
    return nest(tokens);
};