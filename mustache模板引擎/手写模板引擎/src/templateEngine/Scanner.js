/* 扫描器类 */
export default class Scanner {
    constructor(templateStr) {
        //定义模板字符串
        this.templateStr = templateStr;
        //定义指针
        this.position = 0;
        //定义尾巴
        this.tail = templateStr;
    };
    //跳过指定内容
    scan(tag) {
        //如果尾巴中出现需要通过的内容,就让指针加上指定内容的长度,并且更新尾巴,不然会陷入死循环
        if(this.tail.indexOf(tag) == 0) {
            this.position += tag.length;
            this.tail = this.templateStr.substring(this.position)
        }
    };
    //让指针扫描直到遇到指定内容,并返回扫描的字符
    scanUntil(stopTag) {
        //保存指针移动前的位置的位置
        let pos_backup = this.position;
        //如果在尾巴的第一位不是指定的字符并且尾巴的长度不为0,就移动指针,并且更新尾巴
        while (this.tail.indexOf(stopTag) != 0 && !this.eos()) {
            this.position++;
            //更新尾巴为模板字符串从指针开始到最后的子字符串
            this.tail = this.templateStr.substring(this.position);
        };
        //返回指针移动前的位置到当前指针位置之间的字符串
        return this.templateStr.substring(pos_backup,this.position);
    };
    //判断指针是否到头
    eos() {
        return this.position >= this.templateStr.length;
    }
}