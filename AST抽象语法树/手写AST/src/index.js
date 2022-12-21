import parse from "./AST/parse";

const templateString = `
    <div class="box box1 box2" id="target" click="@item">
        <h3>你好!</h3>
        <ul>
            <li>A</li>
            <li>B</li>
            <li>C</li>
        </ul>
    </div>
`;

let result = parse(templateString);

console.log(result);



