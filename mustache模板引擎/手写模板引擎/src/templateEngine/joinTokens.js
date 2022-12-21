export default function joinTokens(tokens) {
    const result = [];
    for (let i = 0; i < tokens.length; i++) {
        tokens[i] instanceof Object ? result.push(tokens[i].join("")) : result.push(tokens[i]);
    }
    return result.join("");
};