export default function(tag,attrs,type,text,children) {
    type = type || 3;
    text = text || "";
    return {
        tag,
        attrs,
        type,
        text,
        children
    };
}