//求重复最多的字符
let str = "asasabbbbsbbbsbbcdcccddddd";

function head(str) {
    if(!str) return "";
    //定义两个指针
    let i = 0;
    let j = 1;
    //定义最大的重复次数
    let maxRepectCount = 0;
    //定义最大的重复的字符
    let maxRepectChar = "";
    //如果j指针没有到最后就一直循环
    while (j <= str.length) {
        //判断两个指针所对字符不一样
        if(str[i] !== str[j]) {
            //判断最大重复次数是否小于当前字符的重复次数
            if(maxRepectCount < j - i) {
                //如果是就修改最大重复次数为当前的重复次数
                maxRepectCount = j - i;
                //保存当前重复的字符
                maxRepectChar = str[i];
            }
            //让i指针指向j
            i = j;
        };
        //让j指针后移
        j++;
    };
    return maxRepectChar;
};

console.log(head(str));
