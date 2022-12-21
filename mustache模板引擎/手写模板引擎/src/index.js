import templateEngine from "./templateEngine";

let template = templateEngine.render(
    `
    <div class="main" id="root">
        <h2>剑来主要人员列表(遍历数组)</h2>
        <ul>
            {{#people}}
            <li>{{name}}——{{age}}岁</li>
            {{/people}}
        </ul>
        <ul>
            {{#food}}
            <li>{{.}}</li>
            {{/food}}
        </ul>
        <h2>汽车信息(carInformation)[遍历对象]</h2>
        <ul>
            <li>
            品牌:{{car.brand}}
            颜色:{{car.color}}
            价格:{{car.price}}
            </li>
        </ul>
        <h2>遍历字符串</h2>
        <ol>
            <li>
                {{str}}
            </li>
        </ol>
    </div>
    `
    , {
        people: [
            { id: "001", name: "陈平安", age: 40 },
            { id: "002", name: "宁姚", age: 40 },
            { id: "003", name: "齐静春", age: 300 },
            { id: "004", name: "崔东山", age: 18 },
            { id: "005", name: "持剑者", age: 100000 }
        ],
        car: {
            brand: "特斯拉",
            color: "黑色",
            price: 300000,
        },
        str: "临兵斗者皆阵列",
        a:[1],
        food:[
            "苹果",
            "菠萝"
        ],

    });

document.body.innerHTML = template;

