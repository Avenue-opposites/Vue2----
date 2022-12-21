import joinTokens from "./joinTokens.js";
export default function parseTokens(tokens,data) {
    const parsedTokens = [];
    let token;
    for(let i = 0;i < tokens.length;i++) {
        token = tokens[i];
        switch (token[0]) {
            case "text":
                parsedTokens.push(token[1]);
                break;
            case "name":
                parsedTokens.push(data[token[1]]);
                break;
            case "#":
                data[token[1]].forEach(el => {
                    parsedTokens.push(parseTokens(token[2],el));
                });
                break;
        }
    };
    return joinTokens(parsedTokens);
}