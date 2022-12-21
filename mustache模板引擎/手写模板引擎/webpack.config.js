const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
    mode:"development",
    entry:"./src/index.js",
    output:{
        filename:"bundle.js"
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:path.resolve(__dirname,"public/index.html")
        })
    ],
    devServer:{
        port:8080,
        open:true,
        host:"localhost"
    }
};