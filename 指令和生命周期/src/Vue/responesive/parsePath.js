export default function parsePath(str) {
    const strArr = str.split(".");
    return (target) => {
        strArr.forEach(key => {
            if(!target) return;
            target = target[key]; 
        });
        return target;
    };
}