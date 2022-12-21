import renderTemplate from "./renderTemplate.js";
import Tokens from "./Tokens.js";

export default {
    /* 渲染方法 */
    render(templateStr,data) {
        const tokens = Tokens(templateStr);
        // console.log(tokens);
        const innerHTML = renderTemplate(tokens,data);
        // console.log(innerHTML);
        return innerHTML;
    },
    
};
